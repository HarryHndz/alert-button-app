export interface IUser{
  id:number,
  token:string,
  name:string,
  email:string,
  lastName?:string,
  phone?:string,
  active:boolean,
  username?:string,
}

export interface IResUser {
  id: number,
  email: string,
  password: string,
  name: string,
  last_name: string,
  phone_number: string,
  created_at: string,
  active: boolean
}

export interface IAddContact {
  name: string,
  last_name: string,
  phone_number: string,
  relationship: string,
}
