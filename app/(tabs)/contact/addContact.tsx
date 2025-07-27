import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { PhoneIcon } from '@/components/ui/icon'; // usa tus iconos definidos
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { addContact } from '@/service/userService';
import { AddContactData, contactSchema } from '@/validation/addContactValidation';
import { Image } from 'expo-image';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Platform, ScrollView, Text, useWindowDimensions } from 'react-native';

const initialValues: AddContactData = {
  name: '',
  last_name: '',
  phone_number: '',
  relationship: ''
};

export default function AddContact() {

  const { width } = useWindowDimensions();
  const isWeb = width >= 768 || Platform.OS === 'web';
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      setApiError('');
      setLoading(true);
      try {
        await addContact(values);

        formik.resetForm();
        setApiError('');
        alert(`Contacto guardado:\n${JSON.stringify(values, null, 2)}`);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          console.log("aaa", err)
          setApiError(err.response.data.message);
        } else {
          setApiError('Ocurrió un error inesperado.');
        }
      }
      finally {
        setLoading(false)
      }
    },
  });

  const Formulario = (
    <Box className="flex flex-col p-6 w-full">
      <Text className="text-xl font-bold text-white mb-6 text-center">
        Agregar contacto
      </Text>
      {apiError ? (
        <Text className="text-red-500 text-center mb-4">{apiError}</Text>
      ) : null}
      <FormControl>
        <Box className="flex flex-col gap-4 w-full">
          <Box className="w-full">
            <Text className="text-white mb-1">Nombre</Text>
            <Input>
              <InputSlot>
                <InputIcon as={PhoneIcon} />
              </InputSlot>
              <InputField
                placeholder="Ingrese el nombre"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
              />
            </Input>
            {formik.touched.name && formik.errors.name && (
              <Text className="text-red-500 text-xs mt-1">
                {formik.errors.name}
              </Text>
            )}
          </Box>

          <Box className="w-full">
            <Text className="text-white mb-1">Apellido</Text>
            <Input>
              <InputSlot>
                <InputIcon as={PhoneIcon} />
              </InputSlot>
              <InputField
                placeholder="Ingrese el apellido"
                value={formik.values.last_name}
                onChangeText={formik.handleChange('last_name')}
                onBlur={formik.handleBlur('last_name')}
              />
            </Input>
            {formik.touched.last_name &&
              formik.errors.last_name && (
                <Text className="text-red-500 text-xs mt-1">
                  {formik.errors.last_name}
                </Text>
              )}
          </Box>

          <Box className="w-full">
            <Text className="text-white mb-1">Relación con el contacto</Text>
            <Input>
              <InputSlot>
                <InputIcon as={PhoneIcon} />
              </InputSlot>
              <InputField
                placeholder="Ingrese relación"
                value={formik.values.relationship}
                onChangeText={formik.handleChange('relationship')}
                onBlur={formik.handleBlur('relationship')}
              />
            </Input>
            {formik.touched.relationship &&
              formik.errors.relationship && (
                <Text className="text-red-500 text-xs mt-1">
                  {formik.errors.relationship}
                </Text>
              )}
          </Box>

          {/* Teléfono */}
          <Box className="w-full">
            <Text className="text-white mb-1">Teléfono</Text>
            <Input>
              <InputSlot>
                <InputIcon as={PhoneIcon} />
              </InputSlot>
              <InputField
                placeholder="Ingrese el teléfono"
                value={formik.values.phone_number}
                onChangeText={formik.handleChange('phone_number')}
                onBlur={formik.handleBlur('phone_number')}
                keyboardType="phone-pad"
              />
            </Input>
            {formik.touched.phone_number && formik.errors.phone_number && (
              <Text className="text-red-500 text-xs mt-1">
                {formik.errors.phone_number}
              </Text>
            )}
          </Box>

          {/* Botón */}
          <Button
            className="mt-8 w-full bg-indigo-700"
            onPress={() => formik.handleSubmit()}
            disabled={loading}
          >
            <ButtonText>{loading ? 'Guardando...' : 'Guardar'}</ButtonText>
          </Button>
        </Box>
      </FormControl>
    </Box>
  );

  // --- Renderizado ---
  if (isWeb) {
    // VERSIÓN WEB (modal centrado con imagen de fondo)
    return (
      <Box className="flex-1">
        <Image
          source={{
            uri: 'https://w.wallhaven.cc/full/6l/wallhaven-6lkyeq.png',
          }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <Box className="flex-1 items-center justify-center bg-black/50 p-4">
          <Box className="w-full max-w-lg rounded-3xl bg-neutral-900">
            {Formulario}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-black p-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {Formulario}
      </ScrollView>
    </Box>
  );

}