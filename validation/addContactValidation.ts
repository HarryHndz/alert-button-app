import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().min(2, 'El nombre es requerido').required('El nombre es requerido'),
  last_name: yup.string().min(2, 'Los apellidos son muy cortos').required('El apellido es requerido'),
  phone_number: yup.string().min(8, 'El teléfono no es válido requerido').required('El teléfono es requerido'),
  relationship: yup.string().min(2, 'Relación con la persona muy corta').required('Relación es requerida')
});

export type AddContactData = yup.InferType<typeof contactSchema>