import { ButtonLoader } from '@/components/ButtonLoader';
import { ThemedInput } from '@/components/ThemedInput';
import { Box } from '@/components/ui/box';
import { FormControl } from '@/components/ui/form-control';
import { PhoneIcon } from '@/components/ui/icon';
import { IContact } from '@/data/interfaces/IContact';
import { contactSchema, contactSchemaUpdate } from '@/data/validations/addContactValidation';
import { useContact } from '@/hooks/useContact';
import { useErrorToast } from '@/hooks/useErrorToast';
import { addContact, updateContact } from '@/service/contactService';
import LocalStorage from '@/utils/storage';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { FormikHelpers, useFormik } from 'formik';
import { User2Icon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, useWindowDimensions } from 'react-native';


export default function AddContact() {
  const {id} = useLocalSearchParams<{id?:string}>()
  const {getContactByIdStore,addContactStore,updateContactStore} = useContact()
  const [initialValues, setInitialValues] = useState<IContact>({
    id:0,
    name: '',
    lastName: '',
    phone: '',
    relationship: '',
    userId:0,
    active:true,
  })
  const { width } = useWindowDimensions();
  const { showErrorToast } = useErrorToast()
  const isWeb = width >= 768 || Platform.OS === 'web';
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values:IContact,formikHelpers:FormikHelpers<IContact>)=>{
    try {
      setLoading(true);
      const storage = new LocalStorage()
      const session = await storage.getSession()
      if (!session) return
      if (id && id !== '0') {
        const response = await updateContact(session.token,values)
        updateContactStore(response)
      } else {
        const response = await addContact(session.token,{...values,userId:Number(session.id)})
        addContactStore(response)
      }
      formikHelpers.resetForm()
      router.back()
    } catch (error) {
      showErrorToast('Error', `${error}`)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: id ? contactSchemaUpdate : contactSchema,
    onSubmit: handleSubmit,
    enableReinitialize:true,
  });

  useEffect(()=>{
    if (id && id !== '0') {
      const contact = getContactByIdStore(parseInt(id))
      if (contact) {
        setInitialValues({
          id:contact.id,
          name: contact.name,
          lastName: contact.lastName,
          phone: contact.phone,
          relationship: contact.relationship,
          userId: contact.userId,
          active: contact.active,
        })
      }
    }
  },[id,getContactByIdStore])



  const Formulario = (
    <Box className="flex flex-col p-6 w-full">
      <Text className="text-xl font-bold text-white mb-6 text-center">
        Agregar contacto
      </Text>
      <FormControl>
        <Box className="flex flex-col gap-4 w-full">
          <ThemedInput
            iconLeft={User2Icon}
            sizeInput='lg'
            variant='outline'
            isInvalid={!!formik.errors.name && formik.touched.name ? true : false}
            label='Nombre'
            placeholder="Ingrese el nombre"
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            errorMessage={formik.errors.name ?? ''}
            cn='w-full'
          />
          <ThemedInput
            iconLeft={User2Icon}
            sizeInput='lg'
            variant='outline'
            isInvalid={!!formik.errors.lastName && formik.touched.lastName ? true : false}
            label='Apellido'
            placeholder="Ingrese el apellido"
            value={formik.values.lastName}
            onChangeText={formik.handleChange('lastName')}
            onBlur={formik.handleBlur('lastName')}
            errorMessage={formik.errors.lastName ?? ''}
            cn='w-full'
          />
          <ThemedInput
            iconLeft={User2Icon}
            sizeInput='lg'
            variant='outline'
            isInvalid={!!formik.errors.relationship && formik.touched.relationship ? true : false}
            label='Relación'
            placeholder="Ingrese relación"
            value={formik.values.relationship}
            onChangeText={formik.handleChange('relationship')}
            onBlur={formik.handleBlur('relationship')}
            errorMessage={formik.errors.relationship ?? ''}
            cn='w-full'
          />
          <ThemedInput
            iconLeft={PhoneIcon}
            sizeInput='lg'
            variant='outline'
            isInvalid={!!formik.errors.phone && formik.touched.phone ? true : false}
            label='Teléfono'
            placeholder="Ingrese el teléfono"
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            keyboardType="phone-pad"
            errorMessage={formik.errors.phone ?? ''}
            cn='w-full'
          />
          <ButtonLoader
            isSubmitting={loading}
            handleSubmit={formik.handleSubmit}
            text={id && id !== '0' ? 'Actualizar' : 'Guardar'}
          />
        </Box>
      </FormControl>
    </Box>
  );


  if (isWeb) {
    return (
      <Box className="flex-1">
        <Image
          source={{
            uri: 'https://w.wallhaven.cc/full/6l/wallhaven-6lkyeq.png',
          }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <Box className="flex-1 items-center justify-center bg-black/50 p-4">
          <Box className="w-full max-w-lg rounded-3xl bg-neutral-900">
            {Formulario}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-black p-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {Formulario}
      </ScrollView>
    </Box>
  );

}