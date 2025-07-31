import { IPassword } from '@/data/IPassword';
import * as Yup from 'yup';

export const passwordValidation = ():Yup.ObjectSchema<IPassword>=>{
  return Yup.object().shape({
    currentPassword:Yup.string().required('La contraseña actual es requerida'),
    password: Yup.string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .test('different-password', 'La nueva contraseña debe ser diferente a la contraseña actual', function(value) {
        const currentPassword = this.parent.currentPassword;
        return value !== currentPassword;
      }),
    confirmPassword: Yup.string().required('La confirmación de contraseña es requerida').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
  })
}