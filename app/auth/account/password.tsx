import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { UnlockIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { IPassword } from "@/data/interfaces/IPassword";
import { passwordValidation } from "@/data/validations/passwordValidation";
import { changePasswordService } from "@/service/authService";
import LocalStorage from "@/utils/storage";
import { router } from "expo-router";
import { useFormik } from "formik";
import { Alert, Text } from "react-native";

export default function PasswordScreen() {
  const initialValues:IPassword = {
    currentPassword: '',
    password: '',
    confirmPassword: ''
  }
  
  const handleChangePassword = async (values:IPassword)=>{
    try {
      const storage = new LocalStorage()
      const sesion = await storage.getSession()
      if (!sesion)return
      await changePasswordService(values.currentPassword,values.password,sesion.token)
      return router.replace('/auth/(tabs)')
    } catch (error) {
      console.log(error)
      Alert.alert('Error',`${error}`)
    }
  }
  
  const {
    errors,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    touched,
    handleSubmit
  } = useFormik({
    initialValues,
    onSubmit:handleChangePassword,
    validationSchema:passwordValidation()
  })
  return (
    <Box className="flex-1 w-full bg-neutral-900 gap-5 p-10">
      <Text className="text-white text-2xl font-bold">Cambiar contraseña</Text>
      <Text className="text-white text-base">Crea una nueva contraseña segura. Asegurate de que no sea la misma que la anterior por seguridad.</Text>
      <FormControl className="mt-5">
        <Box className='mb-4'>
          <Text className='text-white pb-2'>Contraseña actual</Text>
          <Input variant='outline' size='lg' isInvalid={!!errors.currentPassword && touched.currentPassword}>
          <InputSlot className='pl-3'>
            <InputIcon as={UnlockIcon}/>
          </InputSlot>
          <InputField
            value={values.currentPassword}
            onChangeText={handleChange('currentPassword')}
            onBlur={handleBlur('currentPassword')}
            placeholder='Ingrese su correo' />
          </Input>
          {
            errors.currentPassword && touched.currentPassword && (
              <Text className='text-red-500'>{errors.currentPassword}</Text>
            )
          }
        </Box>
       <Box className='mb-4'>
          <Text className='text-white pb-2'>Nueva Contraseña</Text>
          <Input variant='outline' size='lg' isInvalid={!!errors.password && touched.password}>
          <InputSlot className='pl-3'>
            <InputIcon as={UnlockIcon}/>
          </InputSlot>
          <InputField
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder='Ingrese su correo' />
          </Input>
          {
            errors.password && touched.password && (
              <Text className='text-red-500'>{errors.password}</Text>
            )
          }
        </Box>
        <Box className='mb-4'>
          <Text className='text-white pb-2'>Confirmar contraseña</Text>
          <Input variant='outline' size='lg' isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
          <InputSlot className='pl-3'>
            <InputIcon as={UnlockIcon}/>
          </InputSlot>
          <InputField
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            placeholder='Ingrese su correo' />
          </Input>
          {
            errors.confirmPassword && touched.confirmPassword && (
              <Text className='text-red-500'>{errors.confirmPassword}</Text>
            )
          }
          <Button className='mt-10' onPress={()=>handleSubmit()} disabled={isSubmitting} >
            {
              isSubmitting ? (
              <>
                <ButtonSpinner color='black' />
                <ButtonText>Enviando...</ButtonText>
              </>
              ) : (
                <ButtonText>Cambiar contraseña</ButtonText>
              )
            }
          </Button>
        </Box>
      </FormControl>
    </Box>
  )
}