import { ButtonLoader } from '@/components/ButtonLoader'
import { ThemedInput } from '@/components/ThemedInput'
import { Box } from '@/components/ui/box'
import { Divider } from '@/components/ui/divider'
import { FormControl } from '@/components/ui/form-control'
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  UnlockIcon
} from '@/components/ui/icon'
import { ILogin } from '@/data/interfaces/ILogin'
import { loginValidation } from '@/data/validations/loginValidation'
import { useErrorToast } from '@/hooks/useErrorToast'
import { useVerifySession } from '@/hooks/useVerifySession'
import { loginService } from '@/service/authService'
import LocalStorage from '@/utils/storage'
import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import { useState } from 'react'
import { ActivityIndicator, Platform, Text } from 'react-native'

export default function Index() {
  const {isLoading} = useVerifySession()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {showErrorToast} = useErrorToast()
  const initialValues:ILogin = {
    email:'',
    password:'',
  }
  
  const stylesForm = Platform.OS === 'web' 
    ? 'flex flex-col p-10 w-1/2 h-auto bg-neutral-900 rounded-t-xl gap-3' 
    : 'flex flex-col p-8 w-full h-3/4 bg-neutral-900 rounded-t-xl gap-3'
  const stylesContainer = Platform.OS === 'web' 
    ? 'flex-1 justify-end w-full h-full items-center justify-center' 
    : 'flex-1 justify-end w-full h-full'

  
  const handleLogin = async (values:ILogin)=>{
    try {
      const response = await loginService(values)
      if (response) {
        const storage = new LocalStorage()
        await storage.setSession(response)
        return router.replace('/auth/(tabs)')
      }
    } catch (error) {
      showErrorToast('Error',`${error}`)
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