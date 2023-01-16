import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>
}
