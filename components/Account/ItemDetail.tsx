import { Text } from "react-native";
import { Box } from "../ui/box";

interface IItemDetailProps {
  label:string
  value:string
}

export const ItemDetail = ({label,value}:IItemDetailProps)=>(
   <Box className="flex-row w-full items-center gap-2 justify-between px-10 py-2">
    <Text className="text-lg font-bold text-white">{label}</Text>
    <Text className="text-base text-white">{value}</Text>
  </Box>
)