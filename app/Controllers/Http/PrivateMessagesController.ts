import UserService from "App/Services/UserService";
import MercureService from "App/Services/MercureService";
import PrivateMessageService from "App/Services/PrivateMessageService";

export default class PrivateMessagesController {
  private async index(){
    return PrivateMessageService.index()
  }
  private async getUsersWithMessage({params}){
    return PrivateMessageService.getUsersWithMessage(params.userId)
  }
  private async store({ request, response, params }) {
    const { content }: {content: string} = request.all()

    const sender = await UserService.findByUserName(params.sender)
    const receiver = await UserService.findByUserName(params.receiver)

    if (!receiver || !sender){
      return response.status(404).json("A user not found")
    }

    let message = ""

     if (receiver.token){
       message = await MercureService.sendPrivateMessage(content, sender.username, receiver.token)
     }

    await PrivateMessageService.store(content, receiver.id, sender.id)
    return response.status(201).json(message)
  }
}
