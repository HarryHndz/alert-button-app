import { IContact } from "@/data/interfaces/IContact"
import { create } from "zustand"
import { combine } from "zustand/middleware"

interface IContactState{
  contacts:IContact[]
}


interface IContactActions{
  setContactsStore:(contacts:IContact[])=>void
  addContactStore:(contact:IContact)=>void
  deleteContactStore:(id:number)=>void
  getContactByIdStore:(id:number)=>IContact|undefined
  updateContactStore:(contact:IContact)=>void
}

const useStore = create(
  combine<IContactState,IContactActions>(
    {contacts:[],},
    (set,get)=>({
      setContactsStore:(contacts:IContact[])=>set({contacts}),
      addContactStore:(contact:IContact)=>{
        set((state:any)=>({contacts:[...state.contacts,contact]}))
      },
      deleteContactStore:(id:number)=>{
        set((state:any)=>({contacts:state.contacts.filter((c:IContact)=>c.id !== id)}))
      },
      getContactByIdStore:(id:number)=>get().contacts.find((c:IContact)=>c.id === id),
      updateContactStore:(contact:IContact)=>{
        set((state:any)=>({contacts:state.contacts.map((c:IContact)=>c.id === contact.id ? contact : c)}))
      }
    })
  )
)

export default useStore