import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Channel from 'App/Models/Channel'
import User from 'App/Models/User'

export default class Message extends BaseModel {
  public static table = 'message'

  @column({ isPrimary: true })
  public id: bigint

  @column()
  public content: string

  @hasOne(() => Channel)
  public channel_id: HasOne<typeof Channel>

  @hasOne(() => User)
  public user_id: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
