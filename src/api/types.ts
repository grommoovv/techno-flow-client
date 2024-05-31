export interface IUser {
  id: number
  username: string
  email?: string
  fullname?: string
  created_at: Date
}

export interface IEquipment {
  id: number
  title: string
  status: string
  created_at: Date
  is_available: boolean
}

export interface IEquipmentUsageHistory {
  id: number
  username: string
  event_title: string
  start_date: Date
  end_date: Date
}

export interface IEvent {
  id: number
  title: string
  type: string
  start_date: Date
  end_date: Date
  duration: Date
  status: string
  user_id: number
  username?: string
}

export type DataType = IUser[] | IUser | IEquipment[] | IEquipment

export interface IDataResponse<T> {
  status: string
  message: string
  data?: T
  error?: string
  statusCode: number
  timestamp: Date
}

export interface ISignInResponse {
  user: IUser
  access_token: string
}
