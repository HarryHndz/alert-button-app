import { Platform, Pressable, Text } from "react-native"
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
  return(
    <Box className="flex flex-col items-center justify-center my-4">
      <Pressable
        style={{
          width: Platform.OS === 'web' ? 300 : 220,
          height: Platform.OS === 'web' ? 300 : 220,
          borderRadius: 150,
          backgroundColor: (sending || isConnected) ? '#a94444' : '#dc6b6b',
          borderWidth: 8,
          borderColor: '#a94444',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 12,
          opacity: sending ? 0.7 : 1,
        }}
        onPress={handleNewAlert}
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
    </Box>
  )
}