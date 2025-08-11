import { IUser } from "@/data/interfaces/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class LocalStorage {
  private readonly KEY_SESSION = 'session'
  public async setSession(user:IUser){
    await AsyncStorage.setItem(this.KEY_SESSION,JSON.stringify(user))
  }
  public async getSession():Promise<IUser|null>{
    const user = await AsyncStorage.getItem(this.KEY_SESSION)
    return user ? JSON.parse(user) : null
  }
  public async removeSession(){
    await AsyncStorage.removeItem(this.KEY_SESSION)
  }
}