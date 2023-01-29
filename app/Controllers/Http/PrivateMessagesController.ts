import UserService from "App/Services/UserService";
import MercureService from "App/Services/MercureService";
import PrivateMessageService from "App/Services/PrivateMessageService";

export default class PrivateMessagesController {
  private async index(){
    return PrivateMessageService.index()
  }
  private async getUsersWithMessage({params}){
    return PrivateMessageService.getUsersWithMessage(params.userId)
  }
  private async store({ request, response, params }) {
    const { content }: {content: string} = request.all()

    await UserService.show(params.senderId)
    const receiver = await UserService.show(params.receiverId)

    let message = ""

     if (receiver.token){
       message = await MercureService.sendPrivateMessage(content, receiver.token)
     }

    await PrivateMessageService.store(content, params.receiverId, params.senderId)
    return response.status(201).json(message)
  }
}
