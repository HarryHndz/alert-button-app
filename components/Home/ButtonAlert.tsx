import { useEffect } from "react"
import { Pressable, Text } from "react-native"
import Animated, { useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { Box } from "../ui/box"
import { ButtonSpinner } from "../ui/button"
interface IButtonAlertProps {
  sending: boolean
  isConnected: boolean
  handleNewAlert: () => Promise<void>
}

export const ButtonAlert = (
  { sending, isConnected, handleNewAlert }: IButtonAlertProps
)=>{
  const valueAnimation = useSharedValue(220)
  
  useEffect(() => {
    if (sending) {
      valueAnimation.value = withRepeat(withTiming(270, { duration: 1000 }), -1,true)
    } else {
      valueAnimation.value = withTiming(220, { duration: 300 })
    }
  }, [sending])

  return(
    <Box className="flex flex-col items-center justify-center my-4 w-full h-[290px]">
      <Animated.View style={{
        width:valueAnimation,
        height:valueAnimation,
        borderRadius: 150,
        backgroundColor: (sending || isConnected) ? '#a94444' : '#dc6b6b',
        borderColor: '#a94444',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sending ? 0.5 : 1,
      }}>
        <Pressable
          style={{
            width:220,
            height:220,
            borderRadius: 150,
            backgroundColor:'#dc6b6b',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={()=>handleNewAlert()}
          disabled={sending || isConnected}
          >
          {sending ? (
            <ButtonSpinner color="white" />
          ) : (
            <Text className="text-white text-2xl md:text-3xl font-semibold">
              Presionar
            </Text>
          )}
        </Pressable>
      </Animated.View>
    </Box>
  )
}