import User from "App/Models/User";
import Env from "@ioc:Adonis/Core/Env";
import AuthService from "App/Services/AuthService";

export default class UserService {
  public static async index() {
    const users = await User.all();
    return users.map(({token, ...keepAttrs}) => keepAttrs)
  }

  public static async store({ username }) {
    const token = await AuthService.computedToken(username)
    return await User.create({ username, token })
  }

  public static async findByUserName(username: string) {
    const user = await User.findBy('username', username)
    if (user){
      delete user.token
    }
    return user
  }
  public static async getAdminUser() {
    return await this.findByUserName(Env.get('SITE_NAME'))
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
