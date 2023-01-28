import Channel from "App/Models/Channel";
import ChannelUser from "App/Models/ChannelUser";
import UserService from "App/Services/UserService";

export default class ChannelService {
  public static async index() {
    return Channel.query()
      .preload("users")
      .preload("messages", (messagesQuery) => {
        messagesQuery.preload('user')
      })
      .orderBy("id", "asc");
  }

  public static async addUserChannel(channel: string, username: string) {
    const channelFind = await this.findByName(channel);
    const user = await UserService.findByUserName(username);
    if (!channelFind || !user) return null;
    return await ChannelUser.create({ channelId: Number(channelFind.id), userId: Number(user.id) });
  }

  public static async removeUserChannel(channel: string, username: string) {
    const channelFind = await this.findByName(channel);
    const user = await UserService.findByUserName(username);
    if (!channelFind || !user) return null;

    const channelUser = await ChannelUser.query().where({ channel_id: channelFind.id, user_id: user.id }).first();

    if (!channelUser) return null;
    await channelUser.delete();
    return "User remove to channel";
  }

  public static async store({ name }: { name: string }) {
    return await Channel.create({ name });
  }

  public static async findByName(name: string) {
    return await Channel.findBy("name", name);
  }

  public static async show(id: number) {
    return await Channel.findOrFail(id);
  }

  public static async update(id: number, data: { name: string }) {
    const channel = await Channel.findOrFail(id);
    channel.merge(data);
    await channel.save();

    return channel;
  }

  public static async destroy(name: string) {
    const channel = await Channel.findBy("name", name);
    if (!channel || name === "general") {
      return null;
    }
    await channel.delete();
    return channel;
  }
}
