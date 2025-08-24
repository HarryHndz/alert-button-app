import { IUser } from "@/data/interfaces/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Class LocalStorage to save session user 
 * @class
 * @method setSession - save user session
 * @method getSession - get user session
 * @method removeSession - remove user session
 */
export default class LocalStorage {
  /**
   * key for user session
   * @private
   * @constant
   * {string}
   * @readonly
   */
  private readonly KEY_SESSION = 'session'

  /**
   * save user session
   * @public
   * @param user 
   */
  public async setSession(user:IUser){
    await AsyncStorage.setItem(this.KEY_SESSION,JSON.stringify(user))
  }

  /**
   * get user session
   * @public
   * @returns user | null
   */
  public async getSession():Promise<IUser|null>{
    const user = await AsyncStorage.getItem(this.KEY_SESSION)
    return user ? JSON.parse(user) : null
  }

  /**
   * remove user session
   * @public
   * @returns void
   */
  public async removeSession(){
    await AsyncStorage.removeItem(this.KEY_SESSION)
  }
}