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