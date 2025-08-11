import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup.string().email('Correo inválido').required('El correo es requerido'),
  name: yup.string().min(2, 'El nombre es requerido').required('El nombre es requerido'),
  last_name: yup.string().min(2, 'Los apellidos son muy cortos').required('El apellido es requerido'),
  phone_number: yup.string().min(8, 'El teléfono no es válido requerido').required('El teléfono es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

export type RegisterData = yup.InferType<typeof registerSchema>; 