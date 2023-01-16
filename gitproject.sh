#!/bin/bash
#Install github cli instruction if not exit on your machine
command -v gh >/dev/null 2>&1 || { echo >&2 "please install github cli and run command gh auth login: https://cli.github.com/manual/installation"; exit 1; }
# Help command

# Fonction for display help
Help() {
  echo "#####################################################################################################"
  echo "#"
  echo "#                                    GITPROJECT.SH"
  echo "#"
  echo "# This script allows epitalk developers to automate and manage git workflow easily."
  echo "#"
  echo "#####################################################################################################"
  echo ""
  echo
  echo "Syntax: sh gitproject.sh [-s|c|i|p|h]"
  echo "options:"
  echo ""
  echo "create [ticket_number] Create, fetch and checkout branch for ticket ( example: sh gitproject.sh create 654 )"
  echo "done Merge issue branch into main branch and change issue status to close ( example: sh gitproject.sh done )"
  echo "h     Print this Help."
}

# Fonction for merge issue branch into main branch, change status to close and move to done column
# Arguments: $2 = ticket number
MergeIssueInDevelop() {
  destination_branch="develop"
  # Get the current git branch
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  # Get first character branch name for get ticket number
  ticket_number=${current_branch:0:1}
  gh issue close "$ticket_number"

  git pull origin "$destination_branch"
  git checkout "$destination_branch"
  git merge "$current_branch"
  git push origin "$destination_branch"
}

# Fonction for create branch for ticket and fetch, checkout this branch
# Arguments: $2 = ticket number
CreateBranch() {
  if [ "$2" ]; then
    # Get Your github Username
    github_username=$(gh api user -q .login)
    # Assign user to issue
    gh issue edit "$2" --add-assignee "$github_username"

    # Get the title of the issue using the gh command
    issue_title=$(gh issue view "$2" --json title --jq .title)
    # remove special characters from issue_title
    issue_title=${issue_title//[^a-zA-Z0-9 ]/}
    # replace multiple spaces with single space and trim title
    issue_title="$(echo -e "${issue_title}" | tr -s ' ' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
    # Replace spaces with dashes and concatenate the issue number to the branch name to avoid filename issues
    branch_name=$2-${issue_title// /-}
    # Create the issue branch and link the branch to the GitHub issue
    gh issue develop "$2" --name "feature/$branch_name" --base "$branch_name"

    git fetch origin
    git pull origin "$branch_name"
    # Checkout to the created branch
    git checkout "$branch_name"

    echo "branch $branch_name created and checkout successfully"
    exit 0
  fi
  echo "Please specify allows ticket number, sh gitproject.sh create [ticket_number] ( example: sh gitproject.sh create 654 )"
}

# Enable options arguments
while getopts "h" option; do
  case $option in
  h)
    Help
    exit
    ;;
  ?)
    printf "Command not found, please use command -h for display help"
    exit 1
    ;;
  esac
done

# Display message if no argument or option supplied
if [ $OPTIND -eq 1 ] && [ $# -eq 0 ]; then echo "An argument is required, please use command -h for display help"; fi

# Enable options
if [ "$1" == "create" ]; then CreateBranch "$1" "$2"; fi
if [ "$1" == "done" ]; then MergeIssueInDevelop; fi
