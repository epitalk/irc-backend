import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ChannelUser extends BaseModel {
  public static table = 'channel_user'

  @column({ isPrimary: true })
  public id: number

  @column({columnName: "channel_id"})
  public channelId: number

  @column({columnName: "user_id"})
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
