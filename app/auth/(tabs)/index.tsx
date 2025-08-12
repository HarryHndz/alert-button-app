import { Box } from '@/components/ui/box';
import { ButtonSpinner } from '@/components/ui/button';
import { IAlert } from '@/data/interfaces/IAlert';
import { useContact } from '@/hooks/useContact';
import { useSession } from '@/hooks/useSession';
import { getContacts } from '@/service/contactService';
import { newAlert } from '@/service/userService';
import * as Location from 'expo-location';
import { Client, Message } from 'paho-mqtt';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text } from 'react-native';

const topic = 'emergency/location';
const brokerHost  = "192.168.1.70"; // tu IP local
const port = 8083;

export default function HomeScreen() {
  const {session} = useSession()
  const {contacts,setContactsStore} = useContact()
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
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

  const fetchContacts = async()=>{
    try {
      if (!session) return 
      setIsLoading(true)
      const contacts = await getContacts(session.token,session.id)
      setContactsStore(contacts)
    } catch (error) {
      console.log('error',error)
      setErrorMsg('Error al obtener los contactos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewAlert = async () => {
    try {
      setSending(true)
      const loc = await getLocation()
      if (!loc || !session) return setSending(false)
      const payload: IAlert = {
        location_lat: loc.coords.latitude,
        location_lng: loc.coords.longitude,
        user_id: session.id,
        alert_type_id: 1,
        dive_type_id: 1,
        url:`http://localhost:8081/auth/map?userId=${session.id}`
      }
      const response = await newAlert(session.token,payload)
      if (client && isConnected) {
        const msg = new Message(JSON.stringify(payload));
        msg.destinationName = topic;
        client.send(msg);
      }
      console.log('response',response)
    } catch (error) {
      console.log('error',error)
    } finally {
      setSending(false)
    }
  };

  useEffect(() => {
    if (session) {
      fetchContacts()
    }
  }, [session]);

  useEffect(()=>{
    if (isLoading || !session)return

    const mqttClient = new Client(brokerHost, port, "expo_" + Math.random())
    mqttClient.onConnectionLost = (responseObject) => {
      console.log("Conexión perdida:", responseObject.errorMessage);
      setIsConnected(false);
    };

    mqttClient.connect({
      onSuccess: () => {
        console.log("Conectado al broker");
        setIsConnected(true);
        mqttClient.subscribe(`${topic}/${session.id}`);
      },
      onFailure: (err) => {
        console.log("Error al conectar", err);
      },
      useSSL: false,
    });

    setClient(mqttClient);
    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
    
  },[isLoading,session])

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
            onPress={handleNewAlert}
            disabled={sending}
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


// const handlePress = async () => {
//   setSending(true);

//   const loc = await getLocation();
//   if (!loc) {
//     setSending(false);
//     return;
//   }

//   const payload: INewAlert = {
//     location_lat: loc.coords.latitude,
//     location_lng: loc.coords.longitude,
//   };

//   try {
//     if (client && isConnected) {
//       const msg = new Message(JSON.stringify(payload));
//       msg.destinationName = topic;
//       client.send(msg);
//     }
//     const reponse = await newAlert(payload)
//     console.log("Respuesta de la alerta", reponse)

//     console.log('Ubicación enviada:', payload);
//   } catch (err) {
//     console.error('Error al enviar la ubicación', err);
//   } finally {
//   }
// };



// useEffect(() => {
//   fetchContacts()
  
//   const mqttClient = new Client(brokerHost, port, "expo_" + Math.random())
//   mqttClient.onConnectionLost = (responseObject) => {
//     console.log("Conexión perdida:", responseObject.errorMessage);
//     setIsConnected(false);
//   };

//   mqttClient.connect({
//     onSuccess: () => {
//       console.log("Conectado al broker");
//       setIsConnected(true);
//       mqttClient.subscribe(topic);
//     },
//     onFailure: (err) => {
//       console.log("Error al conectar", err);
//     },
//     useSSL: false,
//   });

//   setClient(mqttClient);

//   return () => {
//     if (mqttClient && mqttClient.isConnected()) {
//       mqttClient.disconnect();
//     }
//   };
  
// }, []);

// const [client, setClient] = useState<Client | null>(null);
  // const [isConnected, setIsConnected] = useState(false);