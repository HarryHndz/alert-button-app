import { Box } from '@/components/ui/box';
import { ButtonSpinner } from '@/components/ui/button';
import { IContact } from '@/data/IContact';
import { INewAlert } from '@/data/IUser';
import { useVerifySession } from '@/hooks/useVerifySession';
import { getContacts } from '@/service/contactService';
import { newAlert } from '@/service/userService';
import LocalStorage from '@/utils/storage';
import * as Location from 'expo-location';
import { connect } from 'mqtt/dist/mqtt';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text } from 'react-native';
// Importa polyfills SOLO para React Native
if (Platform.OS !== 'web') {
  require('react-native-get-random-values');
  require('react-native-url-polyfill/auto');
}

const topic = 'emergency/location';

// Parámetros del broker
const BROKER_HOST = "192.168.1.70"; // tu IP local
const BROKER_PORT = 8083;
const BROKER_PATH = "/mqtt"; // path default de websockets mosquitto

export default function HomeScreen() {
  const {isLoading} = useVerifySession()
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [contacts, setContacts] = useState<IContact[]>([])
  const [sending, setSending] = useState(false);

  // MQTT client
  let mqttClient = useRef<any>(null);
  
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder a la ubicación');
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      return loc;
    } catch (error) {
      console.error(error);
      setErrorMsg('Error al obtener la ubicación');
      return null;
    }
  };

  const handlePress = async () => {
    setSending(true);

    const loc = await getLocation();
    if (!loc) {
      setSending(false);
      return;
    }

    const payload: INewAlert = {
      location_lat: loc.coords.latitude,
      location_lng: loc.coords.longitude,
    };

    try {
      const reponse = await newAlert(payload)
      console.log("Respuesta de la alerta", reponse)

      
      // Publicar según la plataforma
      if (Platform.OS === 'web') {
        if (mqttClient.current?.isConnected()) {
          const { Message } = await import('paho-mqtt');
          const msg = new Message(JSON.stringify(payload));
          msg.destinationName = topic;
          mqttClient.current.send(msg);
        }
      } else {
        // mqtt.js en móvil
        if (mqttClient.current?.connected) {
          mqttClient.current.publish(topic, JSON.stringify(payload));
        }
      }

      console.log('Ubicación enviada:', payload);
    } catch (err) {
      console.error('Error al enviar la ubicación', err);
    } finally {
      // Simular pequeña pausa antes de volver a habilitar
      //setTimeout(() => {
      //  setSending(false);
      //}, 1000);
    }
  };

  useEffect(() => {
    const fetchContacts = async()=>{
      try {
        const storage = new LocalStorage()
        const session = await storage.getSession()
        if (!session) return 
        const contacts = await getContacts(session.token,session.id)
        setContacts(contacts)
      } catch (error) {
        console.log('error',error)
      }
    }
    // Crear cliente MQTT según plataforma
    if (Platform.OS === 'web') {
      // --- WEB: PAHO ---
      import('paho-mqtt').then(({ Client }) => {
        const client = new Client(BROKER_HOST, BROKER_PORT, BROKER_PATH, "expo-web-" + Math.random());

        client.onConnectionLost = (res) => {
          console.log('MQTT conexión perdida', res.errorMessage);
        };

        client.onMessageArrived = (message) => {
          console.log('Mensaje recibido:', message.payloadString);
        };

        client.connect({
          useSSL: false,
          onSuccess: () => {
            console.log('Conectado a MQTT (WEB)');
            client.subscribe(topic);
          },
          onFailure: (err) => {
            console.error('Error al conectar (WEB)', err);
          },
        });

        mqttClient.current = client;
      });

    } else {
      // --- MOBILE: mqtt.js ---
      const url = `ws://${BROKER_HOST}:${BROKER_PORT}`;
      const client = connect(url, {
        clientId: 'expo-mobile-' + Math.random(),
      });

      client.on('connect', () => {
        console.log('Conectado a MQTT (Mobile)');
        client.subscribe(topic);
      });

      client.on('message', (t: string, msg: Buffer) => {
        console.log('Mensaje recibido:', t, msg.toString());
      });

      client.on('error', (err: any) => {
        console.error('Error MQTT (Mobile):', err);
      });

      mqttClient.current = client;
    }

    return () => {
      if (mqttClient.current) {
        if (Platform.OS === 'web') {
          mqttClient.current.disconnect();
        } else {
          mqttClient.current.end();
        }
      }
    };

    
  }, [isLoading]);


  if (isLoading) {
    return(
      <Box className='flex-1 items-center justify-center'>
       <ActivityIndicator size='large' color='white' />
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-neutral-900 w-full h-full justify-center items-center">
      <Box className="flex-1 w-full flex flex-col justify-center items-center">
        <Text className="text-white font-bold text-3xl md:text-6xl text-center mt-8">Botón de Emergencia</Text>
        <Text className="text-neutral-400 text-base md:text-lg text-center mt-2 mb-8 max-w-xl">
          En caso de emergencia, presiona el botón para enviar tu ubicación a todos tus contactos de emergencia.
        </Text>
        <Box className="flex flex-col items-center justify-center my-4">
          <Pressable
            style={{
              width: Platform.OS === 'web' ? 300 : 220,
              height: Platform.OS === 'web' ? 300 : 220,
              borderRadius: 150,
              backgroundColor: sending ? '#a94444' : '#dc6b6b',
              borderWidth: 8,
              borderColor: '#a94444',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 12,
              opacity: sending ? 0.7 : 1,
            }}
            onPress={sending ? undefined : handlePress}
            >
            {sending ? (
              <ButtonSpinner color="white" />
            ) : (
              <Text className="text-white text-2xl md:text-3xl font-semibold">
                Presionar
              </Text>
            )}
          </Pressable>
        </Box>
        <Text className="text-neutral-400 text-center mt-8 mb-2">
          {
            contacts ? (
              contacts.length + ' Contactos guardados'
            ) : (
              'No hay contactos registrados'
            )
          }
        </Text>
        {errorMsg ? (
          <Text className="text-red-500 text-center mb-4">{errorMsg}</Text>
        ) : location ? (
          <>
            <Text className="text-neutral-600 text-center text-xs">Latitud: {location.coords.latitude}</Text>
            <Text className="text-neutral-600 text-center text-xs">Longitud: {location.coords.longitude}</Text>
          </>
        ) : (
          <>
            <ButtonSpinner color='black' />
            <Text className='text-neutral-600 text-center text-xs'>Obteniendo ubicación...</Text>
          </>
        )}
      </Box>
    </Box>
  );
}
