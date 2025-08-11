import { ButtonLoader } from '@/components/ButtonLoader';
import { ThemedInput } from '@/components/ThemedInput';
import { Box } from '@/components/ui/box';
import { FormControl } from '@/components/ui/form-control';
import { EyeIcon, EyeOffIcon, MailIcon, UnlockIcon } from '@/components/ui/icon';
import { Image } from 'expo-image';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { registerUser } from '../service/userService';
import { RegisterData, registerSchema } from '../validation/validation';

const initialValues: RegisterData = {
  email: '',
  name: '',
  last_name: '',
  phone_number: '',
  password: '',
};

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setApiError('');
      setLoading(true);
      try {
        await registerUser(values);
        formik.resetForm();
        setApiError('');
        alert('¡Registro exitoso!');
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          console.log("aaa", err)
          setApiError(err.response.data.message);
        } else {
          setApiError('Ocurrió un error inesperado.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box className="flex-1 flex flex-col md:flex-row w-full h-screen md:gap-x-12">
      {/* Imagen a la izquierda */}
      <Box className="hidden md:flex flex-1 bg-black items-center justify-center">
        <Image source={{uri: 'https://w.wallhaven.cc/full/6l/wallhaven-6lkyeq.png'}} style={{ width: '100%', height: '100%' }} />
      </Box>
      {/* Formulario a la derecha */}
      <Box className="w-full md:w-2/5 flex flex-col justify-center items-center bg-neutral-900 h-full md:px-12">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="w-full"
        >
          <Box className="flex flex-col p-8 w-full md:max-w-xl md:mx-auto">
            <Text className="text-2xl font-bold text-white mb-6 text-center">Registrarse</Text>
            {apiError ? (
              <Text className="text-red-500 text-center mb-4">{apiError}</Text>
            ) : null}
            <FormControl>
              <Box className="flex flex-col gap-4 w-full">
                <ThemedInput
                  iconLeft={MailIcon}
                  sizeInput='lg'
                  cn='w-full'
                  variant='outline'
                  isInvalid={!!formik.errors.email && formik.touched.email ? true : false}
                  label='Correo'
                  placeholder="Ingrese su correo"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  errorMessage={formik.errors.email ?? ''}
                />
                <ThemedInput
                  sizeInput='lg'
                  cn='w-full'
                  variant='outline'
                  isInvalid={!!formik.errors.name && formik.touched.name ? true : false}
                  label='Nombre'
                  placeholder="Ingrese su nombre"
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  errorMessage={formik.errors.name ?? ''}
                />
                <ThemedInput
                  sizeInput='lg'
                  cn='w-full'
                  variant='outline'
                  isInvalid={!!formik.errors.last_name && formik.touched.last_name ? true : false}
                  label='Apellidos'
                  placeholder="Ingrese su apellido"
                  value={formik.values.last_name}
                  onChangeText={formik.handleChange('last_name')}
                  onBlur={formik.handleBlur('last_name')}
                  errorMessage={formik.errors.last_name ?? ''}
                />
                <ThemedInput
                  sizeInput='lg'
                  cn='w-full'
                  variant='outline'
                  isInvalid={!!formik.errors.phone_number && formik.touched.phone_number ? true : false}
                  label='Teléfono'
                  placeholder="Ingrese su teléfono"
                  value={formik.values.phone_number}
                  onChangeText={formik.handleChange('phone_number')}
                  onBlur={formik.handleBlur('phone_number')}
                  keyboardType="phone-pad"
                  errorMessage={formik.errors.phone_number ?? ''}
                />

                <ThemedInput
                  iconLeft={UnlockIcon}
                  sizeInput='lg'
                  cn='w-full'
                  variant='outline'
                  isInvalid={!!formik.errors.password && formik.touched.password ? true : false}
                  label='Contraseña'
                  placeholder="Ingrese su nombre"
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  errorMessage={formik.errors.name ?? ''}
                  type={showPassword ? 'text' : 'password'}
                  secureTextEntry={!showPassword}
                  iconRight={showPassword ? EyeIcon : EyeOffIcon}
                  iconRightPress={()=>setShowPassword(!showPassword)}
                />
                <ButtonLoader
                  isSubmitting={loading}
                  handleSubmit={formik.handleSubmit}
                  text='Registrarse'
                />
              </Box>
            </FormControl>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
}