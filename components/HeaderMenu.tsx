import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { LogOut, User, UserCircle } from 'lucide-react-native';
import { Platform, Pressable, View } from "react-native";

interface HeaderMenuProps{
    handleLogout:()=>void
}

export const HeaderMenu = ({handleLogout}:HeaderMenuProps)=>{
  const style = Platform.OS === 'web' ? 'w-[50] h-auto' : 'w-full h-[90] pt-10'
    return(
      <View className={`${style} items-end justify-center bg-neutral-900`}>
        <Menu
          offset={5}
          trigger={({ ...triggerProps }) => {
            return (
              <Pressable {...triggerProps} className='rounded-full w-[45] h-[45]'>
                <UserCircle size={30} color='white' />
              </Pressable>
            )
          }}
        >
        <MenuItem key="Add account" textValue="Add account" className='gap-2'>
          <User size={20} color='white'/>
          <MenuItemLabel size="xl">Ver Perfil</MenuItemLabel>
        </MenuItem>
        <MenuItem key="Community" textValue="Community" onPress={handleLogout} className='gap-2'>
          <LogOut size={20} color='white'/>
          <MenuItemLabel size="xl">Cerrar Sesión</MenuItemLabel>
        </MenuItem>
      </Menu>
    </View>
    )
}