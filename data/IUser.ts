
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
  user_id: number,
  name: string,
  last_name: string,
  phone_number: string,
  relationship: string,
  active: boolean,
  contact_id: number
}

