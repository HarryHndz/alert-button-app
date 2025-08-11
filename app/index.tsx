import { ButtonLoader } from '@/components/ButtonLoader'
import { ThemedInput } from '@/components/ThemedInput'
import { Box } from '@/components/ui/box'
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
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { ILogin } from '@/data/interfaces/ILogin'
import { loginValidation } from '@/data/validations/loginValidation'
import { useVerifySession } from '@/hooks/useVerifySession'
import { loginService } from '@/service/authService'
import LocalStorage from '@/utils/storage'
import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import { useState } from 'react'
import { ActivityIndicator, Platform, Pressable, Text } from 'react-native'

export default function Index() {
  const {isLoading} = useVerifySession()
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
        return router.replace('/auth/(tabs)')
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

  if (isLoading) {
    return(
      <Box className='flex-1 items-center justify-center'>
       <ActivityIndicator size='large' color='white' />
      </Box>
    )
  }
  
  return (
    <Box className={stylesContainer}>
      <Box className={stylesForm}>
        <FormControl>
          <ThemedInput
            cn='mb-4' 
            iconLeft={MailIcon}
            sizeInput='lg'
            variant='outline'
            isInvalid={!!errors.email && touched.email ? true : false}
            label='Correo'
            errorMessage={errors.email ?? ''}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder='Ingrese su correo'
          />
          <ThemedInput
            cn='mb-4'
            iconLeft={UnlockIcon}
            sizeInput='lg'
            variant='outline'
            isInvalid={!!errors.password && touched.password ? true : false}
            label='Contraseña'
            errorMessage={errors.password ?? ''}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            type={showPassword ? 'text' : 'password'} 
            placeholder='Ingrese su contraseña'
            iconRight={showPassword ? EyeIcon : EyeOffIcon}
            iconRightPress={()=>setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
          />
          <ButtonLoader
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            text='Iniciar sesión'
          />
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