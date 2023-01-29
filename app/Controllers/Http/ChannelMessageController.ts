import ChannelMessageService from 'App/Services/ChannelMessageService'
import MercureService from "App/Services/MercureService";
import ChannelService from "App/Services/ChannelService";
import UserService from "App/Services/UserService";

export default class ChannelMessageController {
  private async index({ response }) {
    const messages = await ChannelMessageService.index()

    return response.json(messages)
  }

  private async store({ request, response, params }) {
    const { content, username }: {content: string, username: string} = request.all()

    const channel = await ChannelService.findByName(params.channel)
    const user = await UserService.findByUserName(username)

    if (!channel || !user) return response.status(404).send('Channel or user not found')

    const newMessage = await MercureService.newMessage({content, username}, params.channel)

    await ChannelMessageService.store(content, channel.id, user.id)
    return response.status(201).json(newMessage)
  }

  private async show({ params, response }) {
    const message = await ChannelMessageService.show(params.id)

    return response.json(message)
  }

  private async update({ params, request, response }) {
    const { content } = request.all()
    const message = await ChannelMessageService.update(params.id, { content })

    return response.json(message)
  }

  private async destroy({ params, response }) {
    await ChannelMessageService.destroy(params.id)

    return response.status(204).json(null)
  }
}
