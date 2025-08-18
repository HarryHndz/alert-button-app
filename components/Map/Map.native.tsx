import { SearchIcon } from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { MAP_CONFIG } from '@/constants/MapConfig'
import { MapProps } from '@/data/types/Map'
import { useEffect, useRef } from 'react'
import { View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export default function Map({ 
  latitude = MAP_CONFIG.DEFAULT_LATITUDE,
  longitude = MAP_CONFIG.DEFAULT_LONGITUDE,
  alertLocation,
  isConnected,
  onLocationSelect,
}: MapProps) {
  
  const mapRef = useRef<MapView>(null);
  
  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  console.log("isconected",isConnected)
  console.log("alertLocation",alertLocation)

  useEffect(() => {
    if (alertLocation && mapRef.current) {
      const newRegion = {
        latitude: Number(alertLocation.latitude),
        longitude: Number(alertLocation.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  }, [alertLocation]);

  return (
    <View style={{flex:1}}>
      <Input variant='rounded' size='lg' className='absolute w-5/6 mx-8 z-10 top-10 bg-neutral-900'>
        <InputSlot className='pl-5'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder='Buscar...' />
      </Input>
      
      {isConnected !== undefined && (
        <View className={`absolute top-24 right-8 w-3 h-3 rounded-full z-10 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
      )}
      
      <MapView  
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{width: '100%', height: '100%'}}
        initialRegion={initialRegion}
        onPress={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          onLocationSelect?.(latitude, longitude);
        }}
      >
        {/* Marcador de alerta si existe */}
        {alertLocation && (
          <Marker
            coordinate={{
              latitude: Number(alertLocation.latitude),
              longitude: Number(alertLocation.longitude),
            }}
            title={alertLocation.title || 'Alerta'}
            description={alertLocation.description}
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  )
}