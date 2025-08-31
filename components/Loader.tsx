import { ActivityIndicator } from "react-native"
import { Box } from "./ui/box"


export const Loader = ()=>{
  return(
    <Box className='flex-1 items-center justify-center'>
      <ActivityIndicator size='large' color='white' />
    </Box>
  )
}