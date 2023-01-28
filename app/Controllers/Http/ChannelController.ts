import ChannelService from 'App/Services/ChannelService'
import MercureService from "../../Services/MercureService";

export default class ChannelController {
  private async index({ response }) {
    const channels = await ChannelService.index()

    return response.json(channels)
  }

  private async store({ request, response }) {
    const { name } = request.all()
    const channel = await ChannelService.store({ name })
    await MercureService.createTopic(channel)
    return response.status(201).json(channel)
  }

  private async addUserChannel({ request, response }) {
    const { channel, username }: {channel: string, username: string} = request.all()
    const channelUpdated = await ChannelService.addUserChannel(channel, username)

    if (!channelUpdated) return response.status(404).send('Channel or user not found')
    return response.status(200).json(channelUpdated)
  }

  private async removeUserChannel({ request, response }) {
    const { channel, username }: {channel: string, username: string} = request.all()
    const channelUpdated = await ChannelService.removeUserChannel(channel, username)

    if (!channelUpdated) return response.status(404).send('Channel or user not found')
    return response.status(200).json(channelUpdated)
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
    const res = await ChannelService.destroy(params.name)
    if (!res) return response.status(404).send('Channel not found')
    return response.status(204).json(null)
  }
}
