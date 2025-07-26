import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { FormControl } from '@/components/ui/form-control'
import { EyeIcon, EyeOffIcon, MailIcon, UnlockIcon } from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { ILogin } from '@/data/ILogin'
import { loginValidation } from '@/validation/loginValidation'
import { Link } from 'expo-router'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Text } from 'react-native'

export default function Index() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const initialValues:ILogin = {
    email:'',
    password:'',
  }

  const {handleSubmit,values,errors,handleChange,handleBlur} = useFormik({
    initialValues,
    validationSchema:loginValidation(),
    onSubmit:async(values)=>{
      console.log(values)
    }
  })
  return (
    <Box className='flex-1 justify-end w-full h-full'>
      <Box className='flex flex-col p-8 w-full h-3/4 bg-neutral-900 rounded-t-xl gap-3'>
        <FormControl>
          <Box className='mb-4'>
            <Text className='text-white pb-2'>Correo</Text>
            <Input variant='outline' size='lg'>
            <InputSlot className='pl-3'>
              <InputIcon as={MailIcon}/>
            </InputSlot>
            <InputField placeholder='Ingrese su correo' />
            </Input>
          </Box>
          <Box className='mb-4'>
            <Text className='text-white pb-2'>Contraseña</Text>
            <Input variant='outline' size='lg'>
            <InputSlot className='pl-3'>
              <InputIcon as={UnlockIcon}/>
            </InputSlot>
            <InputField type={showPassword ? 'text' : 'password'} placeholder='Ingrese su contraseña' />
            <InputSlot className='pr-3' onPress={()=>setShowPassword(!showPassword)}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
            </InputSlot>
            </Input>
            <Text className='text-white py-4'>¿Olvidaste tu contraseña?</Text>
          </Box>
          <Button className='mt-4'>
            <ButtonText>Iniciar sesión</ButtonText>
          </Button>
        </FormControl>
        <Divider className='my-4' />
        <Box className='flex flex-row items-center justify-center gap-1'>
          <Text className='text-white'>¿No tienes una cuenta?,</Text>
          <Link href='/register'>
            <Text className='text-white'>Regístrate</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}