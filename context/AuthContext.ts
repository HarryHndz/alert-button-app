import type { IUser } from "@/data/interfaces/IUser";
import { createContext } from "react";

interface IDataAuthContext {
  user: IUser | null
  isLoading: boolean
  login: (data: IUser) => Promise<void>
  logout: () => Promise<void>
}


export const AuthContext = createContext<IDataAuthContext>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {}
})