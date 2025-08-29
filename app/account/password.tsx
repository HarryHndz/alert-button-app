import { ButtonLoader } from "@/components/ButtonLoader";
import { ThemedInput } from "@/components/ThemedInput";
import { Box } from "@/components/ui/box";
import { FormControl } from "@/components/ui/form-control";
import { UnlockIcon } from "@/components/ui/icon";
import { IPassword } from "@/data/interfaces/IPassword";
import { passwordValidation } from "@/data/validations/passwordValidation";
import { useErrorToast } from "@/hooks/useErrorToast";
import { changePasswordService } from "@/service/authService";
import { router } from "expo-router";
import { useFormik } from "formik";
import { Text } from "react-native";

export default function PasswordScreen() {
  const initialValues:IPassword = {
    currentPassword: '',
    password: '',
    confirmPassword: ''
  }
  const { showErrorToast } = useErrorToast()
  const handleChangePassword = async (values:IPassword)=>{
    try {
      await changePasswordService(values.currentPassword,values.password)
      return router.replace('/(tabs)')
    } catch (error) {
      console.log(error)
      showErrorToast('Error', `${error}`)
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
        <ThemedInput 
          value={values.currentPassword}
          onChangeText={handleChange('currentPassword')}
          onBlur={handleBlur('currentPassword')}
          placeholder='Ingrese su contraseña' 
          errorMessage={errors.currentPassword ?? ''}
          isInvalid={errors.currentPassword && touched.currentPassword ? true : false}
          sizeInput='lg'
          iconLeft={UnlockIcon}
          cn='mb-4'
          label='Contraseña actual'
          variant='outline'
        />
        <ThemedInput 
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder='Ingrese su contraseña' 
          errorMessage={errors.password ?? ''}
          isInvalid={errors.password && touched.password ? true : false}
          sizeInput='lg'
          iconLeft={UnlockIcon}
          cn='mb-4'
          label='Nueva contraseña'
          variant='outline'
        />
        <ThemedInput 
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          placeholder='Ingrese su contraseña' 
          errorMessage={errors.confirmPassword ?? ''}
          isInvalid={errors.confirmPassword && touched.confirmPassword ? true : false}
          sizeInput='lg'
          iconLeft={UnlockIcon}
          cn='mb-4'
          label='Confirmar contraseña'
          variant='outline'
        />
        <ButtonLoader 
          isSubmitting={isSubmitting} 
          handleSubmit={handleSubmit} 
          text="Cambiar contraseña" 
        />
      </FormControl>
    </Box>
  )
}

