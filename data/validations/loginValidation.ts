import { ILogin } from '@/data/interfaces/ILogin'
import * as yup from 'yup'

export const loginValidation = ():yup.ObjectSchema<ILogin>=>{
  const validationSchema:yup.ObjectSchema<ILogin> = yup.object().shape({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    password: yup.string().required('Contraseña es requerida'),
  })
  return validationSchema
}