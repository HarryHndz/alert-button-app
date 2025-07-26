import { SearchIcon } from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import React from 'react'
import { View } from 'react-native'


export default function Map() {
  return (
    <View style={{flex:1}}>
      <Input variant='rounded' size='lg' className='absolute w-5/6 mx-8 z-10 top-10 bg-neutral-900'>
        <InputSlot className='pl-5'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder='Buscar...' />
      </Input>
    </View>
  )
}