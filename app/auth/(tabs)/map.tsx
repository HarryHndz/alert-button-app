import Map from "@/components/Map/Map";
import { IAlertGeolocation } from "@/data/interfaces/IAlert";
import { useLocalSearchParams } from "expo-router";
import { Client } from 'paho-mqtt';
import { useEffect, useState } from "react";


const brokerHost = process.env.EXPO_PUBLIC_BROKER_HOST ?? ''
const port = Number(process.env.EXPO_PUBLIC_BROKER_PORT) ?? 0
const topic = process.env.EXPO_PUBLIC_TOPIC ?? ''

export default function MapLayout() {
  const {id} = useLocalSearchParams<{id?:string}>()
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [alertLocation, setAlertLocation] = useState<IAlertGeolocation | null>(null)
  
  useEffect(()=>{
    if (id) {
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

      setClient(mqttClient);
      return () => {
        if (mqttClient && mqttClient.isConnected()) {
          mqttClient.disconnect();
        }
      };
    }
  },[id])

  const handleLocationSelect = (latitude: number, longitude: number) => {
    console.log('Ubicación seleccionada:', { latitude, longitude });
    // Aquí puedes agregar lógica adicional cuando se selecciona una ubicación
  };

  const handleMapReady = () => {
    console.log('Mapa listo');
    // Aquí puedes agregar lógica cuando el mapa esté listo
  };

  return (
    <Map 
      isConnected={isConnected}
      alertLocation={alertLocation ? {
        latitude: alertLocation.location_lat,
        longitude: alertLocation.location_lng,
        title: 'Alerta de emergencia',
        description: `ID: ${id}`
      } : undefined}
      onLocationSelect={handleLocationSelect}
      onMapReady={handleMapReady}
    />
  );
}