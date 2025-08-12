import { ContactContext } from "@/context/ContactContext"
import { IContact } from "@/data/interfaces/IContact"
import { ReactNode, useState } from "react"

export const ContactProvider = ({children}: {children: ReactNode}) => {
  const [contacts, setContacts] = useState<IContact[]>([])

  const handleSetContacts = (contacts: IContact[]) => {
    setContacts(contacts)
  }
  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }
  const handleAddContact = (contact: IContact) => {
    setContacts([...contacts, contact])
  }
  const handleUpdateContact = (contact: IContact) => {
    setContacts(contacts.map((c) => c.id === contact.id ? contact : c))
  }
  const handleGetContactById = (id: number) => {
    return contacts.find((contact) => contact.id === id)
  }

  return(
    <ContactContext.Provider value={{
      contacts,
      setContactsStore: handleSetContacts,
      deleteContactStore: handleDeleteContact,
      addContactStore: handleAddContact,
      updateContactStore: handleUpdateContact,
      getContactByIdStore: handleGetContactById
    }}>
      {children}
    </ContactContext.Provider>
  )
}