import { column, BaseModel, ManyToMany, manyToMany, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from 'luxon'
import User from "App/Models/User";
import Message from "App/Models/Message";

export default class Channel extends BaseModel {
  public static table = 'channel'

  @column({ isPrimary: true })
  public id: bigint

  @column()
  public name: string

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
