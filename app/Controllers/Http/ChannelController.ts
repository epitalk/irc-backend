import ChannelService from "App/Services/ChannelService";
import MercureService from "../../Services/MercureService";
import MessageService from "App/Services/MessageService";
import UserService from "App/Services/UserService";

export default class ChannelController {
  private async index({ response }) {
    const channels = await ChannelService.index();

    return response.json(channels);
  }

  private async store({ request, response }) {
    const { name, author }: { name: string, author: string } = request.all();
    const channel = await ChannelService.store({ name });
    await ChannelService.addUserChannel(channel.name, author);
    const res = await ChannelService.show(channel.id);
    if (res) {
      await MercureService.actionTopic(res, "create");
    }
    return response.status(201).json(res);
  }

  private async addUserChannel({ request, response }) {
    const { channel, username }: { channel: string, username: string } = request.all();
    await ChannelService.addUserChannel(channel, username);
    const adminUser = await UserService.getAdminUser();
    const fullChannel = await ChannelService.findByName(channel);

    if (!fullChannel) return response.status(404).send("Channel not found");
    const user = await UserService.findByUserName(username)
    await MercureService.actionTopic(fullChannel, "join", user);

    if (adminUser) {
      const content = `${username} viens de rejoindre le channel ${channel}`;
      await MercureService.newMessage({
        content,
        username: adminUser.username
      }, channel);

      await MessageService.store(content, fullChannel.id, adminUser.id);
    }


    return response.status(200).json(fullChannel);
  }

  private async removeUserChannel({ request, response }) {
    const { channel, username }: { channel: string, username: string } = request.all();
    await ChannelService.removeUserChannel(channel, username);
    const fullChannel = await ChannelService.findByName(channel);
    const adminUser = await UserService.getAdminUser();

    if (!fullChannel) return response.status(404).send("Channel not found");

    const user = await UserService.findByUserName(username)
    await MercureService.actionTopic(fullChannel, "leave", user);

    if (adminUser) {
      const content = `${username} viens de quitter le channel ${channel}`;

      await MercureService.newMessage({
        content,
        username: adminUser.username
      }, channel);

      await MessageService.store(content, BigInt(fullChannel.id), adminUser.id);
    }


    return response.status(200).json(fullChannel);
  }

  private async show({ params, response }) {
    const channel = await ChannelService.show(params.id);

    return response.json(channel);
  }

  private async update({ params, request, response }) {
    const { name } = request.all();
    const channel = await ChannelService.update(params.id, { name });

    return response.json(channel);
  }

  private async destroy({ params, response }) {
    const res = await ChannelService.destroy(params.name);
    console.log(res);
    if (!res) return response.status(404).send("Channel not found");
    await MercureService.actionTopic(res, "delete");
    return response.status(204).json(null);
  }
}
