import { HStack } from '@/components/ui/hstack'
import {
  CloseIcon,
  HelpCircleIcon,
  Icon,
} from '@/components/ui/icon'
import {
  Toast,
  ToastDescription,
  ToastTitle
} from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { Pressable } from 'react-native'

interface ToastErrorProps{
  title: string
  description: string
  toastId: string
  handleClose: () => void
}
export const ToastError = ({ title, description, toastId, handleClose }: ToastErrorProps) => {
  return (
    <Toast
      nativeID={toastId}
      action="error" 
      variant="outline" 
      className='p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between'>
      <HStack space='md'>
        <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
        <VStack space="xs">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>
            {description}
          </ToastDescription>
        </VStack>
      </HStack>
      <HStack>
        <Pressable onPress={handleClose}>
          <Icon as={CloseIcon} />
        </Pressable>
      </HStack>
    </Toast>
  )
}