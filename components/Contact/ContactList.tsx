import { IContact } from "@/data/interfaces/IContact"
import { FlatList, Text } from "react-native"
import { CardContact } from "./CardContact"

interface IContactListProps{
  contacts:IContact[]
  handlePress: (contact: IContact) => void
}
export const ContactList = ({ contacts, handlePress }: IContactListProps)=>{
  return(
    <FlatList
      data={contacts}
      renderItem={({ item }) => (
        <CardContact contact={item} handleShowOptions={() => handlePress(item)} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text className='text-white text-center'>No hay contactos registrados</Text>}
    />
  )
}