import { ContactList } from '@/components/Contact/ContactList';
import { InputSearch } from '@/components/InputSearch';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { IContact } from '@/data/interfaces/IContact';
import { useContact } from '@/hooks/useContact';
import { deleteContact } from '@/service/contactService';
import LocalStorage from '@/utils/storage';
import { router } from 'expo-router';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';


export default function Contact() {
  const {contacts,deleteContactStore} = useContact()
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [contactSelected, setContactSelected] = useState<IContact | null>(null)

  const handleShowOptions = (contact:IContact) =>{
    if ( !contactSelected || contactSelected?.id !== contact.id) {
     setContactSelected(contact)
    }
    setShowOptions(!showOptions)
  }
  
  const handleCloseOptions = ()=> setShowOptions(false)
    

  const handleEditContact = ()=>{
    console.log("contactSelected",contactSelected)
    if (!contactSelected) return
    handleCloseOptions()
    return router.navigate(`/auth/addcontact/${contactSelected?.id}`)
  }

  const handleDeleteContact = async()=>{
    try {
      const storage = new LocalStorage()
      const session = await storage.getSession()
      if (!session || !contactSelected) return
      await deleteContact(session.token,contactSelected.id)
      deleteContactStore(contactSelected.id)
      setContactSelected(null)
      handleCloseOptions()
    } catch (error) {
      console.log('error',error)
    }
  }

  const contactsFiltered = useMemo(()=>{
    if(searchFilter.length === 0) return contacts
    return contacts.filter(c=>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) || c.lastName.toLowerCase().includes(searchFilter.toLowerCase())
    )
  },[contacts,searchFilter])

  return (
    <Box className='flex-1 pt-10'>
      <Text className='text-white text-2xl font-bold pl-5'>Contactos de emergencia</Text>
      <Text className='text-white text-sm pl-5'>{contactsFiltered.length} contactos registrados</Text>
      <Box className='flex flex-row justify-between gap-2 px-5 mt-5'>
        <InputSearch searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
        <TouchableOpacity onPress={()=>router.navigate('/auth/addcontact/0')} className='w-1/6 bg-blue-950 rounded-lg items-center justify-center'>
          <PlusIcon color='white' />
        </TouchableOpacity>
      </Box>
      <Box className='flex flex-col gap-5 mt-5 px-5'>
        <ContactList contacts={contactsFiltered} handlePress={handleShowOptions} />
        <Actionsheet isOpen={showOptions} onClose={handleCloseOptions} snapPoints={[20]}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={handleEditContact} className='h-24 flex flex-row gap-4'>
              <ActionsheetIcon className="stroke-background-700 w-6 h-6" as={EditIcon} />
              <ActionsheetItemText className='text-lg'>Editar</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleDeleteContact} className='h-24 flex flex-row gap-4'>
              <ActionsheetIcon className="stroke-background-700 w-6 h-6" as={TrashIcon} />
              <ActionsheetItemText className='text-lg'>Eliminar</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </Box>
    </Box>
  );
}
