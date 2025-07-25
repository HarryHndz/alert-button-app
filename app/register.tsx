import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { MailIcon, UnlockIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
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
            <FormControl>
              <Box className="flex flex-col gap-4 w-full">
                <Box className="w-full">
                  <Text className="text-white mb-1">Correo</Text>
                  <Input>
                    <InputSlot>
                      <InputIcon as={MailIcon} />
                    </InputSlot>
                    <InputField placeholder="Ingrese su correo" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Nombre</Text>
                  <Input>
                    <InputField placeholder="Ingrese su nombre" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Apellido paterno</Text>
                  <Input>
                    <InputField placeholder="Ingrese su apellido paterno" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Apellido materno</Text>
                  <Input>
                    <InputField placeholder="Ingrese su apellido materno" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Teléfono</Text>
                  <Input>
                    <InputField placeholder="Ingrese su teléfono" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Contraseña</Text>
                  <Input>
                    <InputSlot>
                      <InputIcon as={UnlockIcon} />
                    </InputSlot>
                    <InputField type={showPassword ? 'text' : 'password'} placeholder="Ingrese su contraseña" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Dirección</Text>
                  <Input>
                    <InputField placeholder="Ingrese su dirección" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Código postal</Text>
                  <Input>
                    <InputField placeholder="Ingrese su código postal" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Ciudad</Text>
                  <Input>
                    <InputField placeholder="Ingrese su ciudad" />
                  </Input>
                </Box>
                <Box className="w-full">
                  <Text className="text-white mb-1">Estado</Text>
                  <Input>
                    <InputField placeholder="Ingrese su estado" />
                  </Input>
                </Box>
                <Button className="mt-8 w-full">
                  <ButtonText>Registrarse</ButtonText>
                </Button>
              </Box>
            </FormControl>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
}