import MapboxMapWeb from "@/components/MapboxMapWeb";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { MAP_CONFIG } from "@/constants/MapConfig";
import { MapProps } from "@/data/types/Map";
import { View } from "react-native";

export default function Map({ 
  latitude = MAP_CONFIG.DEFAULT_LATITUDE,
  longitude = MAP_CONFIG.DEFAULT_LONGITUDE,
  zoom = MAP_CONFIG.DEFAULT_ZOOM,
  alertLocation,
  isConnected,
  onLocationSelect,
  onMapReady
}: MapProps) {
  console.log("Map.web.tsx - Props recibidas:", {
    latitude,
    longitude,
    zoom,
    alertLocation,
    isConnected
  });
  
  return(
    <View style={{flex:1}}>
      <Input variant='rounded' size='lg' className='absolute w-5/6 mx-8 z-10 top-10 bg-neutral-900'>
        <InputSlot className='pl-5'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder='Buscar...' />
      </Input>
      
      {/* Indicador de conexión MQTT */}
      {isConnected !== undefined && (
        <View className={`absolute top-24 right-8 w-3 h-3 rounded-full z-10 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
      )}
      
      <MapboxMapWeb
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        style={{width: '100%', height: '100%'}}
        accessToken={MAP_CONFIG.MAPBOX_ACCESS_TOKEN}
        alertLocation={alertLocation}
        onLocationSelect={onLocationSelect}
        onMapReady={onMapReady}
      />
    </View>
  )
}