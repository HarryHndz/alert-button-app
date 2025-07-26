import { SearchIcon } from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { MAP_CONFIG } from '@/constants/MapConfig'
import React from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default function Map() {
  return (
    <View style={{flex:1}}>
      <Input variant='rounded' size='lg' className='absolute w-5/6 mx-8 z-10 top-10 bg-neutral-900'>
        <InputSlot className='pl-5'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder='Buscar...' />
      </Input>
      <MapView  
        provider={PROVIDER_GOOGLE}
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: MAP_CONFIG.DEFAULT_LATITUDE,
          longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  )
}