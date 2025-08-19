import { ButtonAlert } from '@/components/Home/ButtonAlert';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { IAlert } from '@/data/interfaces/IAlert';
import { useContact } from '@/hooks/useContact';
import { useSession } from '@/hooks/useSession';
import { getContacts } from '@/service/contactService';
import { newAlert } from '@/service/userService';
import * as Location from 'expo-location';
import { Client, Message } from 'paho-mqtt';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Text } from 'react-native';

const brokerHost = process.env.EXPO_PUBLIC_BROKER_HOST ?? ''
const port = Number(process.env.EXPO_PUBLIC_PORT) ?? 0
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

  const titleContact = contacts.length > 0 ? `${contacts.length} Contactos guardados` : 'No hay contactos registrados'

  const handleStopWatchingPosition = ()=>{
    if (watchingPositionRef.current) {
      console.log("entro en el remove")
      if (Platform.OS !== 'web') {
        watchingPositionRef.current.remove()
      }
      watchingPositionRef.current = null
    }
  }

  const handleWatchingPosition = async(sendAlertLocation?:(location: Location.LocationObject) => Promise<void>)=>{
    try {
      handleStopWatchingPosition()
      console.log("entro en el requestForegroundPermissionsAsync")
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      console.log("entro en el watchPositionAsync")
      let isFirst = true
      watchingPositionRef.current = await Location.watchPositionAsync(
        {
          accuracy:Location.Accuracy.Balanced,
          timeInterval:5000,
          distanceInterval:1,
        },
        (location)=>{
          console.log("en la ubicación")
          if (isFirst && sendAlertLocation) {
            sendAlertLocation(location).catch((error)=>{
              console.log('error al enviar la alerta',error)
              setErrorMsg('Error al enviar la alerta')
            })
            isFirst = false
          }
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
      console.log("entro en el connectBroker")
      if (!session) return
      console.log("entro en el if")
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
      console.log("entro en el try de handleNewAlert")
      if (!session) return setSending(false)
      console.log("entro en el if de handleNewAlert")
      await handleWatchingPosition(async (location)=>{
        const payload: IAlert = {
          location_lat: location.coords.latitude,
          location_lng: location.coords.longitude,
          user_id: Number(session.id),
          alert_type_id: 1,
          dive_type_id: 1,
          url:`http://${brokerHost}:${port}/auth/map?id=${session.id}`
        }
        await newAlert(session.token,payload)
        handleConnectBroker()
      })
      console.log("despues de handleWatchingPosition")
    } catch (error) {
      console.log('error',error)
      setErrorMsg('Error al enviar la alerta')
    } finally {
      setSending(false)
    }
  }

  const handleDisconnectBroker = ()=>{
    if (client && client.isConnected()) {
      console.log("Desconectando del broker");
      client.disconnect()
      handleStopWatchingPosition()
      setIsConnected(false)
    }
  }

  useEffect(() => {
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
    if (session) {
      fetchContacts()
    }
  }, [session,setContactsStore]);

  
  useEffect(()=>{
    if (!client || !isConnected || !session || !location) return
    const msg = new Message(JSON.stringify({
      location_lat:location.coords.latitude,
      location_lng:location.coords.longitude}
    ));
    msg.destinationName = `${topic}/${session.id}`
    client.send(msg)
  },[location,client,isConnected,session])


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
        <ButtonAlert
          sending={sending}
          isConnected={isConnected}
          handleNewAlert={handleNewAlert}
        />
        <Text className="text-neutral-400 text-center mt-8 mb-2">
          {titleContact}
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
            <Text className='text-neutral-600 text-center text-xs'>Presiona el botón para obtener tu ubicación.</Text>

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