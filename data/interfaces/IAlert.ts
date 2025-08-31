export interface IAlert {
  location_lat: number
  location_lng: number
  user_id:number
  alert_type_id:number
  dive_type_id:number
  url:string
}

export interface IAlertGeolocation extends Pick<IAlert,'location_lat' | 'location_lng'>{}

export interface IAlerts extends Omit<IAlert,'url'>{
  date:Date
  key:number
}