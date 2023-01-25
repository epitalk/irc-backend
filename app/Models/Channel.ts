import { column, BaseModel, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from 'luxon'
import User from "App/Models/User";

export default class Channel extends BaseModel {
  public static table = 'channel'

  @column({ isPrimary: true })
  public id: bigint

  @column()
  public name: string

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
