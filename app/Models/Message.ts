import { column, BaseModel, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import User from "App/Models/User";

export default class Message extends BaseModel {
  public static table = "message";

  @column({ isPrimary: true })
  public id: bigint;

  @column()
  public content: string;

  @column({columnName: "channel_id"})
  public channelId: bigint;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({columnName: "user_id"})
  public userId: bigint;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime;
}
