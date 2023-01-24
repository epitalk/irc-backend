import User from 'App/Models/User'

export default class UserService {
  public static async index() {
    const users = await User.all()

    return users
  }

  public static async store({ username }) {
    const user = await User.create({ username })

    return user
  }

  public static async show(id) {
    const user = await User.findOrFail(id)

    return user
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
