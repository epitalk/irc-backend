import jws from "jws";
import Env from '@ioc:Adonis/Core/Env'

export default class AuthService {
  private static secret = Env.get('APP_KEY')

  static async computedToken(username: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jws.createSign({
        payload: username,
        secret: this.secret,
        header: { alg: "HS256" }
      })
        .on("error", reject)
        .on("done", resolve);
    });
  }
}
