import User from 'App/Models/User'

export default class UserService {
  public static async index() {
    return await User.all()
  }

  public static async store({ username }) {
    return await User.create({ username })
  }

  public static async show(id) {
    return await User.findOrFail(id)
  }

  public static async update(id, data) {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()

    return user
  }

  public static async destroy(id) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
