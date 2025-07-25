import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Image } from 'expo-image';
import { PlusIcon, TrashIcon } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';
export default function TabTwoScreen() {
  return (
    <Box className='flex-1 pt-10'>
      <Text className='text-white text-2xl font-bold pl-5'>Contactos de emergencia</Text>
      <Text className='text-white text-sm pl-5'> 2 contactos registrados</Text>
      <Box className='flex flex-row justify-between gap-2 px-5 mt-5'>
        <Input variant='outline' size='lg' className='w-5/6'>
          <InputSlot className='pl-5'>
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder='Buscar...' />
        </Input>
        <Pressable className='w-1/6 bg-blue-950 rounded-lg items-center justify-center'>
          <PlusIcon color='white' />
        </Pressable>
      </Box>
      <Box className='flex flex-col gap-5 mt-5 px-5'>
        <Card className='p-6 rounded-lg flex flex-row gap-2 w-full'>
          <Box className='w-1/6'>
            <Image
              source={require('@/assets/images/react-logo.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
            />
          </Box>

          <Box className='flex flex-col gap-2 w-4/6'>
            <Text className='text-white text-lg font-bold'>Harry Hernández</Text>
            <Text className='text-white text-sm'>9931957426</Text>
          </Box>
          <Pressable className='w-1/6 bg-red-500 rounded-lg items-center justify-center'>
            <TrashIcon color='white' />
          </Pressable>
        </Card>
        <Card className='p-6 rounded-lg flex flex-row gap-2 w-full'>
          <Box className='w-1/6'>
            <Image
              source={require('@/assets/images/react-logo.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
            />
          </Box>

          <Box className='flex flex-col gap-2 w-4/6'>
            <Text className='text-white text-lg font-bold'>Harry Hernández</Text>
            <Text className='text-white text-sm'>9931957426</Text>
          </Box>
          <Pressable className='w-1/6 bg-red-500 rounded-lg items-center justify-center'>
            <TrashIcon color='white' />
          </Pressable>
        </Card>
        <Card className='p-6 rounded-lg flex flex-row gap-2 w-full'>
          <Box className='w-1/6'>
            <Image
              source={require('@/assets/images/react-logo.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
            />
          </Box>

          <Box className='flex flex-col gap-2 w-4/6'>
            <Text className='text-white text-lg font-bold'>Harry Hernández</Text>
            <Text className='text-white text-sm'>9931957426</Text>
          </Box>
          <Pressable className='w-1/6 bg-red-500 rounded-lg items-center justify-center'>
            <TrashIcon color='white' />
          </Pressable>
        </Card>

      </Box>
    </Box>
  );
}
