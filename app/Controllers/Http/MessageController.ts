import MessageService from 'App/Services/MessageService'

export default class MessageController {
  private async index({ response }) {
    const messages = await MessageService.index()

    return response.json(messages)
  }

  private async store({ request, response }) {
    const { content, channel_id, user_id } = request.all()
    const message = await MessageService.store({ content, channel_id, user_id })

    return response.status(201).json(message)
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
