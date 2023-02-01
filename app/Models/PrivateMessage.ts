import { column, BaseModel, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import User from "App/Models/User";

export default class PrivateMessage extends BaseModel {
  public static table = "private_message";

  @column({ isPrimary: true })
  public id: bigint;

  @column()
  public content: string;

  @column({columnName: "sender_id"})
  public senderId: bigint;

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'senderId' })
  public sender: BelongsTo<typeof User>

  @column({columnName: "receiver_id"})
  public receiverId: bigint;

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'receiverId' })
  public receiver: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime;
}
