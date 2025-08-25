// eslint-disable-next-line import/no-unresolved
import Map from "@/components/Map/Map";
import { IAlertGeolocation } from "@/data/interfaces/IAlert";
import { useLocalSearchParams } from "expo-router";
import { Client } from 'paho-mqtt';
import { useEffect, useState } from "react";


const brokerHost = process.env.EXPO_PUBLIC_BROKER_HOST ?? ''
const port = Number(process.env.EXPO_PUBLIC_PORT) ?? 0
const topic = process.env.EXPO_PUBLIC_TOPIC ?? ''

export default function MapLayout() {
  const {id} = useLocalSearchParams<{id?:string}>()
  const [isConnected, setIsConnected] = useState(false);
  const [alertLocation, setAlertLocation] = useState<IAlertGeolocation | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `exp://${brokerHost}:${port}/--/auth/map?id=` + id;
      }
    }
  }, [id]);

  useEffect(()=>{
    console.log("id del usuario en el mapa",id)
    if (!id) return
    const mqttClient = new Client(brokerHost, port, "expo_" + Math.random())
    mqttClient.onConnectionLost = (responseObject) => {
      console.log("Conexión perdida:", responseObject.errorMessage);
      setIsConnected(false);
    };

    mqttClient.connect({
      onSuccess: () => {
        console.log("Conectado al broker");
        setIsConnected(true);
        mqttClient.subscribe(`${topic}/${id}`);
        mqttClient.onMessageArrived = (message)=>{
          const dataLocation = JSON.parse(message.payloadString) as IAlertGeolocation
          setAlertLocation(dataLocation)
        }
      },
      onFailure: (err) => {
        console.log("Error al conectar", err);
      },
      useSSL: false,
    });

    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  },[id])


  return (
    <Map 
      isConnected={isConnected}
      alertLocation={alertLocation ? {
        latitude: alertLocation.location_lat,
        longitude: alertLocation.location_lng,
        title: 'Alerta de emergencia',
        description: `ID: ${id}`
      } : undefined}
    />
  );
}