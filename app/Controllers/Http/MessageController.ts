import MessageService from 'App/Services/MessageService'
import MercureService from "App/Services/MercureService";

export default class MessageController {
  private async index({ response }) {
    const messages = await MessageService.index()

    return response.json(messages)
  }

  private async store({ request, response, params }) {
    const { content, username }: {content: string, username: string} = request.all()

    const newMessage = await MercureService.newMessage({content, username}, params.channel)
    return response.status(201).json(newMessage)
  }

  private async show({ params, response }) {
    const message = await MessageService.show(params.id)

    return response.json(message)
  }

  private async update({ params, request, response }) {
    const { content } = request.all()
    const message = await MessageService.update(params.id, { content })

    return response.json(message)
  }

  private async destroy({ params, response }) {
    await MessageService.destroy(params.id)

    return response.status(204).json(null)
  }
}
