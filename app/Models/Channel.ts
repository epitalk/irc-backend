import { column, BaseModel, ManyToMany, manyToMany, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from 'luxon'
import User from "App/Models/User";
import ChannelMessage from "App/Models/ChannelMessage";

export default class Channel extends BaseModel {
  public static table = 'channel'

  @column({ isPrimary: true })
  public id: bigint

  @column()
  public name: string

  @hasMany(() => ChannelMessage)
  public messages: HasMany<typeof ChannelMessage>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
