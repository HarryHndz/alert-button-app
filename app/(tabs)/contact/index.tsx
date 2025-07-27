import { CardContact } from '@/components/Contact/CardContact';
import { Box } from '@/components/ui/box';
import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { IContact } from '@/data/IContact';
import { getContacts } from '@/service/contactService';
import LocalStorage from '@/utils/storage';
import { Link } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';


export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contacts, setContacts] = useState<IContact[]>([])

  useEffect(()=>{
    const fetchContacts = async()=>{
      try {
        setIsLoading(true)
        const storage = new LocalStorage()
        const session = await storage.getSession()
        if (!session) return 
        const contacts = await getContacts(session.token,session.id)
        setContacts(contacts)
      } catch (error) {
        console.log('error',error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()
  },[])

  if (isLoading) {
    return(
      <Box className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='white' />
      </Box>
    )
  }


  return (
    <Box className='flex-1 pt-10'>
      <Text className='text-white text-2xl font-bold pl-5'>Contactos de emergencia</Text>
      <Text className='text-white text-sm pl-5'>{contacts.length} contactos registrados</Text>
      <Box className='flex flex-row justify-between gap-2 px-5 mt-5'>
        <Input variant='outline' size='lg' className='w-5/6'>
          <InputSlot className='pl-5'>
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder='Buscar...' />
        </Input>
        
        <Pressable className='w-1/6 bg-blue-950 rounded-lg items-center justify-center'>
          <Link href='/(tabs)/contact/addContact'>
            <PlusIcon color='white' />
          </Link>
        </Pressable>
      </Box>
      <Box className='flex flex-col gap-5 mt-5 px-5'>
        {
          contacts.length > 0 ? (
            contacts.map((contact)=>(
              <CardContact key={contact.id} contact={contact} />
            ))
          ) : (
            <Text className='text-white text-center'>No hay contactos registrados</Text>
          )
        }
      </Box>
    </Box>
  );
}
