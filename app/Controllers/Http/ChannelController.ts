import ChannelService from 'App/Services/ChannelService'

export default class ChannelController {
  private async index({ response }) {
    const channels = await ChannelService.index()

    return response.json(channels)
  }

  private async store({ request, response }) {
    const { name } = request.all()
    const channel = await ChannelService.store({ name })

    return response.status(201).json(channel)
  }

  private async show({ params, response }) {
    const channel = await ChannelService.show(params.id)

    return response.json(channel)
  }

  private async update({ params, request, response }) {
    const { name } = request.all()
    const channel = await ChannelService.update(params.id, { name })

    return response.json(channel)
  }

  private async destroy({ params, response }) {
    await ChannelService.destroy(params.id)

    return response.status(204).json(null)
  }
}
