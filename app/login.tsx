import { Box } from '@/components/ui/box'
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { FormControl } from '@/components/ui/form-control'
import { HStack } from '@/components/ui/hstack'
import {
  CloseIcon,
  EyeIcon,
  EyeOffIcon,
  HelpCircleIcon,
  Icon,
  MailIcon,
  UnlockIcon
} from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { ILogin } from '@/data/ILogin'
import { loginService } from '@/service/authService'
import LocalStorage from '@/utils/storage'
import { loginValidation } from '@/validation/loginValidation'
import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Platform, Pressable, Text } from 'react-native'

export default function Index() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const initialValues:ILogin = {
    email:'',
    password:'',
  }
  const {show,close,isActive} = useToast()
  const [toastId,setToastId] = useState<number>(0)
  
  const stylesForm = Platform.OS === 'web' 
    ? 'flex flex-col p-10 w-1/2 h-auto bg-neutral-900 rounded-t-xl gap-3' 
    : 'flex flex-col p-8 w-full h-3/4 bg-neutral-900 rounded-t-xl gap-3'
  const stylesContainer = Platform.OS === 'web' 
    ? 'flex-1 justify-end w-full h-full items-center justify-center' 
    : 'flex-1 justify-end w-full h-full'

  const handleShowToast = (title:string,description:string)=>{
    if (!isActive(String(toastId))) {
      handleShowNewToast(title,description)
    }
  }
  const handleShowNewToast = (title:string,description:string)=>{
    const newId = Math.random()
    setToastId(newId)
    show({
      id:String(newId),
      placement:'bottom left',
      duration:3000,
      render:({id})=>{
        const uniqueToastId = `toast-${id}`
        return(
          <Toast 
            nativeID={uniqueToastId} 
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
              <Pressable onPress={() => close(id)}>
                <Icon as={CloseIcon} />
              </Pressable>
            </HStack>
          </Toast>
        )
      }
    })
  }
  
  const handleLogin = async (values:ILogin)=>{
    try {
      const response = await loginService(values)
      if (response) {
        const storage = new LocalStorage()
        await storage.setSession(response)
        return router.replace('/(tabs)')
      }
    } catch (error) {
      handleShowToast('Error',`${error}`)
    }
  }

  const {
    handleSubmit,
    values,errors,
    handleChange,
    handleBlur,isSubmitting,
    touched
  } = useFormik({
    initialValues,
    validationSchema:loginValidation(),
    onSubmit:handleLogin
  })

  return (
    <Box className={stylesContainer}>
      <Box className={stylesForm}>
        <FormControl>
          <Box className='mb-4'>
            <Text className='text-white pb-2'>Correo</Text>
            <Input variant='outline' size='lg' isInvalid={!!errors.email && touched.email}>
            <InputSlot className='pl-3'>
              <InputIcon as={MailIcon}/>
            </InputSlot>
            <InputField 
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder='Ingrese su correo' />
            </Input>
            {
              errors.email && touched.email && (
                <Text className='text-red-500'>{errors.email}</Text>
              )
            }
          </Box>
          <Box className='mb-4'>
            <Text className='text-white pb-2'>Contraseña</Text>
            <Input variant='outline' size='lg' isInvalid={!!errors.password && touched.password}>
              <InputSlot className='pl-3'>
                <InputIcon as={UnlockIcon}/>
              </InputSlot>
              <InputField 
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              
              type={showPassword ? 'text' : 'password'} placeholder='Ingrese su contraseña' />
              <InputSlot className='pr-3' onPress={()=>setShowPassword(!showPassword)}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
              </InputSlot>
            </Input>
            {
              errors.password && touched.password && (
                <Text className='text-red-500'>{errors.password}</Text>
              )
            }
            <Text className='text-white py-4'>¿Olvidaste tu contraseña?</Text>
          </Box>
          <Button className='mt-4' onPress={()=>handleSubmit()} disabled={isSubmitting} >
            {
              isSubmitting ? (
              <>
                <ButtonSpinner color='black' />
                <ButtonText>Enviando...</ButtonText>
              </>
              ) : (
                <ButtonText>Iniciar sesión</ButtonText>
              )
            }
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