import UserService from 'App/Services/UserService'
import ChannelService from 'App/Services/ChannelService'

export default class UserController {
  private async index({ response }) {
    const users = await UserService.index()

    return response.json(users)
  }

  private async store({ request, response }) {
    const { username } = request.all()
    const user = await UserService.store({ username })
    await ChannelService.addUserChannel('general', user.username)
    return response.status(201).json(user)
  }

  private async show({ params, response }) {
    const user = await UserService.show(params.id)

    return response.json(user)
  }

  private async update({ params, request, response }) {
    const { username } = request.all()
    const user = await UserService.update(params.username, { username })

    return response.json(user)
  }

  private async destroy({ params, response }) {
    await UserService.destroy(params.id)

    return response.status(204).json(null)
  }
}
