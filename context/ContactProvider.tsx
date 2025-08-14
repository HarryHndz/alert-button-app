import { ContactContext } from "@/context/ContactContext"
import { IContact } from "@/data/interfaces/IContact"
import { ReactNode, useCallback, useMemo, useState } from "react"

export const ContactProvider = ({children}: {children: ReactNode}) => {
  const [contacts, setContacts] = useState<IContact[]>([])

  const handleSetContacts = useCallback((contacts: IContact[])=>{
    setContacts(contacts)
  },[])

  const handleDeleteContact = useCallback((id: number)=>{
    setContacts(contacts.filter((contact) => contact.id !== id))
  },[])

  const handleAddContact = useCallback((contact: IContact)=>{
    setContacts([...contacts, contact])
  },[])

  const handleUpdateContact = useCallback((contact: IContact)=>{
    setContacts(contacts.map((c) => c.id === contact.id ? contact : c))
  },[])

  const handleGetContactById = useCallback((id: number)=>{
    return contacts.find((contact) => contact.id === id)
  },[])

  const values = useMemo(()=>({
    contacts,
    setContactsStore: handleSetContacts,
    deleteContactStore: handleDeleteContact,
    addContactStore: handleAddContact,
    updateContactStore: handleUpdateContact,
    getContactByIdStore: handleGetContactById
  }),[contacts])

  return(
    <ContactContext.Provider value={values}>
      {children}
    </ContactContext.Provider>
  )
}