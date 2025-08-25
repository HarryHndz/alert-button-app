import { router } from 'expo-router';
import { UserCircle } from 'lucide-react-native';
import { Platform, Pressable, View } from "react-native";

export const HeaderMenu = ()=>{
  const style = Platform.OS === 'web' ? 'w-[50] h-auto' : 'w-full h-[90] pt-10'
  return(
    <View className={`${style} items-end justify-center bg-neutral-900`}>
      <Pressable onPress={()=>router.navigate('/account')} className='rounded-full w-[45] h-[45]'>
        <UserCircle size={30} color='white' />
      </Pressable>
    </View>
  )
}