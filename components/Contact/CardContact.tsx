import { IContact } from "@/data/interfaces/IContact"
import { Image } from "expo-image"
import { Text, TouchableOpacity } from "react-native"
import { Box } from "../ui/box"
import { Card } from "../ui/card"

interface CardContactProps {
  contact: IContact
  handleShowOptions: () => void
}
export const CardContact = ({contact, handleShowOptions}: CardContactProps) => {
  return(
    <Card className='p-6 rounded-lg flex flex-row gap-2 w-full'>
      <TouchableOpacity onPress={handleShowOptions} className="w-full flex flex-row gap-2">
        <Box className='w-1/6'>
        <Image
          source={require('@/assets/images/profile.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Box>
      <Box className='flex flex-col gap-2 w-4/6'>
        <Text className='text-white text-lg font-bold'>{contact.name} {contact.lastName}</Text>
        <Text className='text-white text-sm'>{contact.phone}</Text>
      </Box>
    </TouchableOpacity>
  </Card>
  )
}