import { TWithKey } from "../data/types/TWithKey";

export const errorCodeHandle = (errorCode:string)=>{
  const errorMessages:TWithKey<string> = {
    "401": "Credenciales incorrectas",
    "403": "No tienes permisos para acceder a este recurso",
    "404": "No se encontró el recurso",
    "500": "Error del servidor",
    "409": "El recurso ya existe",
  }
  return errorMessages[errorCode] ?? "Error desconocido"
}

export const errorInternalHandle = (error:any)=>{
  const errorInteranlMessages:TWithKey<string> = {
    ERR_NETWORK: 'Sin conexión a internet, intente más tarde',
    ERR_TIMEOUT: 'Se acabó el tiempo, perdida de conexión',
    ERR_CANCEL: 'Accion cancelada',
    ERR_UNKNOWN: 'Error desconocido, aguarde unos minutos y reintente',
  }
  return errorInteranlMessages[error] ?? "Error desconocido"
}