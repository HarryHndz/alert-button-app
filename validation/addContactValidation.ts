import * as yup from 'yup';

const baseContactSchema = yup.object().shape({
  name: yup.string().min(2, 'El nombre es requerido').required('El nombre es requerido'),
  lastName: yup.string().min(2, 'Los apellidos son muy cortos').required('El apellido es requerido'),
  phone: yup.string().min(8, 'El teléfono no es válido requerido').required('El teléfono es requerido'),
  relationship: yup.string().min(2, 'Relación con la persona muy corta').required('Relación es requerida')
});

export const contactSchema = baseContactSchema
export const contactSchemaUpdate = baseContactSchema.concat(
  yup.object().shape({
    id:yup.number().required('El id es requerido'),
    userId:yup.number().required('El id del usuario es requerido'),
  })
)
