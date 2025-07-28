import { IContact } from "@/data/IContact"
import { Image } from "expo-image"
import { TrashIcon } from "lucide-react-native"
import { Pressable, Text } from "react-native"
import { Box } from "../ui/box"
import { Card } from "../ui/card"

export const CardContact = ({contact}:{contact:IContact}) => {
  return(
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
      <Text className='text-white text-lg font-bold'>{contact.name} {contact.lastName}</Text>
      <Text className='text-white text-sm'>{contact.phone}</Text>
    </Box>
    <Pressable className='w-1/6 bg-red-500 rounded-lg items-center justify-center'>
      <TrashIcon color='white' />
    </Pressable>
  </Card>
  )
}