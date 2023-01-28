import User from "App/Models/User";

export default class UserService {
  public static async index() {
    return await User.all();
  }

  public static async store({ username }) {
    return await User.create({ username });
  }

  public static async findByUserName(username: string) {
    return await User.findBy('username', username)
  }

  public static async show(id) {
    return await User.findOrFail(id);
  }

  public static async update(username: string, data: { username: string }) {
    const user = await User.findBy("username", username);
    if (!user) return null;
    user.merge(data);
    await user.save();

    return user;
  }

  public static async destroy(id) {
    const user = await User.findOrFail(id);
    await user.delete();
  }
}
