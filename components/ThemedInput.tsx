import { ComponentProps, ElementType } from "react"
import { Text } from 'react-native'
import { Box } from "./ui/box"
import { Input, InputField, InputIcon, InputSlot, } from "./ui/input"

type TThemedInputProps={
  iconLeft?:ElementType,
  iconRight?:ElementType,
  iconRightPress?:()=>void,
  sizeInput: 'xl' | 'lg' | 'md' | 'sm'
  isInvalid:boolean
  label:string
  cn?:string
  errorMessage:string
} & ComponentProps<typeof InputField>

export const ThemedInput = ({iconLeft,iconRight,sizeInput,isInvalid,label,errorMessage,iconRightPress,cn,...props}:TThemedInputProps)=>{
  return(
    <Box className={cn}>
      <Text className="text-white pb-2">{label}</Text>
      <Input size={sizeInput} isInvalid={isInvalid} variant={props.variant}>
        {
          iconLeft && (
            <InputSlot className="pl-3">
              <InputIcon as={iconLeft} />
            </InputSlot>
          )
        }
        <InputField {...props} />
        {
          iconRight && (
            <InputSlot onPress={iconRightPress} className="pr-3">
              <InputIcon as={iconRight} />
            </InputSlot>
          )
        }
      </Input>
      {
        isInvalid && <Text className='text-red-500'>{errorMessage}</Text>
      }
    </Box>
  )
}