import { ChevronRight } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { Box } from "../ui/box";

interface IActionAccountProps {
  handleAction: () => void
  icon: ReactNode
  label: string
}

export const ActionAccount = (
  { handleAction, icon, label }: IActionAccountProps
)=>(
  <Pressable 
    onPress={handleAction} 
    className="flex-row items-center justify-between gap-2 bg-black rounded-lg px-4 py-5">
    <Box className="flex-row items-center gap-3">
      {icon}
      <Text className="text-lg font-bold text-white">{label}</Text>
    </Box>
    <ChevronRight size={25} color='white' />
  </Pressable>
)