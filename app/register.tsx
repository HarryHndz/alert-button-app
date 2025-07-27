import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { EyeIcon, EyeOffIcon, MailIcon, UnlockIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
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
                <Box className="w-full">
                  <Text className="text-white mb-1">Correo</Text>
                  <Input>
                    <InputSlot>
                      <InputIcon as={MailIcon} />
                    </InputSlot>
                    <InputField
                      placeholder="Ingrese su correo"
                      value={formik.values.email}
                      onChangeText={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </Input>
                  {formik.touched.email && formik.errors.email && (
                    <Text className="text-red-500 text-xs mt-1">{formik.errors.email}</Text>
                  )}
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Nombre</Text>
                  <Input>
                    <InputField
                      placeholder="Ingrese su nombre"
                      value={formik.values.name}
                      onChangeText={formik.handleChange('name')}
                      onBlur={formik.handleBlur('name')}
                    />
                  </Input>
                  {formik.touched.name && formik.errors.name && (
                    <Text className="text-red-500 text-xs mt-1">{formik.errors.name}</Text>
                  )}
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Apellidos</Text>
                  <Input>
                    <InputField
                      placeholder="Ingrese su apellido"
                      value={formik.values.last_name}
                      onChangeText={formik.handleChange('last_name')}
                      onBlur={formik.handleBlur('last_name')}
                    />
                  </Input>
                  {formik.touched.last_name && formik.errors.last_name && (
                    <Text className="text-red-500 text-xs mt-1">{formik.errors.last_name}</Text>
                  )}
                </Box>

                <Box className="w-full">
                  <Text className="text-white mb-1">Teléfono</Text>
                  <Input>
                    <InputField
                      placeholder="Ingrese su teléfono"
                      value={formik.values.phone_number}
                      onChangeText={formik.handleChange('phone_number')}
                      onBlur={formik.handleBlur('phone_number')}
                      keyboardType="phone-pad"
                    />
                  </Input>
                  {formik.touched.phone_number && formik.errors.phone_number && (
                    <Text className="text-red-500 text-xs mt-1">{formik.errors.phone_number}</Text>
                  )}
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Contraseña</Text>
                  <Input>
                    <InputSlot>
                      <InputIcon as={UnlockIcon} />
                    </InputSlot>
                    <InputField
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese su contraseña"
                      value={formik.values.password}
                      onChangeText={formik.handleChange('password')}
                      onBlur={formik.handleBlur('password')}
                      secureTextEntry={!showPassword}
                    />
                    <InputSlot className='pr-3' onPress={()=>setShowPassword(!showPassword)}>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
                    </InputSlot>
                  </Input>
                  {formik.touched.password && formik.errors.password && (
                    <Text className="text-red-500 text-xs mt-1">{formik.errors.password}</Text>
                  )}
                </Box>
                
                <Button className="mt-8 w-full" onPress={() => formik.handleSubmit()} disabled={loading}>
                  {
                    loading ? (
                      <>
                        <ButtonSpinner color='black' />
                        <ButtonText>Registrando...</ButtonText>
                      </>
                    ) : (
                      <>
                        <ButtonText>Registrarse</ButtonText>
                      </>
                    )
                  }
                </Button>
              </Box>
            </FormControl>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
}