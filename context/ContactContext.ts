import { IContact } from "@/data/interfaces/IContact";
import { createContext } from "react";

interface IDataContext {
  contacts: IContact[]
  setContactsStore: (contacts: IContact[]) => void
  deleteContactStore: (id: number) => void
  addContactStore: (contact: IContact) => void
  updateContactStore: (contact: IContact) => void
  getContactByIdStore: (id: number) => IContact | undefined
}

export const ContactContext = createContext<IDataContext | undefined>(undefined)




