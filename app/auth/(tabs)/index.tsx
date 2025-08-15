import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { IAlert } from '@/data/interfaces/IAlert';
import { useContact } from '@/hooks/useContact';
import { useSession } from '@/hooks/useSession';
import { getContacts } from '@/service/contactService';
import { newAlert } from '@/service/userService';
import * as Location from 'expo-location';
import { Client, Message } from 'paho-mqtt';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text } from 'react-native';

const brokerHost = process.env.EXPO_PUBLIC_BROKER_HOST ?? ''
const port = Number(process.env.EXPO_PUBLIC_BROKER_PORT) ?? 0
const topic = process.env.EXPO_PUBLIC_TOPIC ?? ''

export default function HomeScreen() {
  const {session} = useSession()
  const {contacts,setContactsStore} = useContact()
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const watchingPositionRef = useRef<Location.LocationSubscription | null>(null)

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder a la ubicación');
        return null;
      }
      const loc = await Location.getCurrentPositionAsync({});
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
  const handleStopWatchingPosition = ()=>{
    if (watchingPositionRef.current) {
      console.log("remove")
      watchingPositionRef.current.remove()
      watchingPositionRef.current = null
    }
  }

  const handleWatchingPosition = async()=>{
    try {
      handleStopWatchingPosition()
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      watchingPositionRef.current = await Location.watchPositionAsync(
        {
          accuracy:Location.Accuracy.Balanced,
          timeInterval:5000,
          distanceInterval:1,
        },
        (location)=>{
          setLocation(location)
        }
      )
    } catch (error) {
      console.log('error',error)
      setErrorMsg('Error al obtener la ubicación')
    }
  }
  
  const handleConnectBroker = ()=>{
    try {
      if (!session) return
      const mqttClient = new Client(brokerHost, port, "expo_" + Math.random())
      mqttClient.onConnectionLost = (responseObject) => {
        console.log("Conexión perdida:", responseObject.errorMessage);
        setIsConnected(false);
      };
      mqttClient.connect({
        onSuccess: async() => {
          console.log("Conectado al broker");
          setIsConnected(true);
          mqttClient.subscribe(`${topic}/${session.id}`);
          await handleWatchingPosition()
        },
        onFailure: (err) => {
          console.log("Error al conectar", err);
          handleStopWatchingPosition()
        },
        useSSL: false,
      });

      setClient(mqttClient);
    } catch (error) {
      console.log('error en handleConnectBroker',error)
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
        user_id: Number(session.id),
        alert_type_id: 1,
        dive_type_id: 1,
        url:`http://localhost:8081/auth/map?userId=${session.id}`
      }
      const response = await newAlert(session.token,payload)
      handleConnectBroker()
    } catch (error) {
      console.log('error',error)
      setErrorMsg('Error al enviar la alerta')
    } finally {
      setSending(false)
    }
  };
  const handleDisconnectBroker = ()=>{
    if (client && client.isConnected()) {
      client.disconnect()
      handleStopWatchingPosition()
      setIsConnected(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchContacts()
    }
  }, [session]);

  

  useEffect(()=>{
    if (!client || !isConnected || !session || !location) return
    const msg = new Message(JSON.stringify({
      location_lat:location.coords.latitude,
      location_lng:location.coords.longitude}
    ));
    msg.destinationName = `${topic}/${session.id}`
    client.send(msg)
  },[location])

  useEffect(()=>{
    return()=>{
      handleDisconnectBroker()
    }
  },[])

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
              backgroundColor: (sending || isConnected) ? '#a94444' : '#dc6b6b',
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
            disabled={sending || isConnected}
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
        {
          isConnected && (
            <Button className='bg-red-500' onPress={handleDisconnectBroker}>
              <ButtonText className='text-white'>
                Desconectar
              </ButtonText> 
            </Button>
          )
        }
      </Box>
    </Box>
  );
}