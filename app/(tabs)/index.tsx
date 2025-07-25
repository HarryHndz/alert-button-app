import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function HomeScreen() {
  return (
   <View className="h-96 bg-white">
    <Text className="bg-white">Home</Text>
    <Text className="text-white">Home</Text>
    <Textarea  
      size="md"
      isReadOnly={false}
      isInvalid={false}
      isDisabled={false}
      className="w-64">
        <TextareaInput placeholder="Enter your text here" />
      </Textarea>
    <Link href='/login'>
      Ir a la página de inicio
    </Link>
   </View>
  )
}
