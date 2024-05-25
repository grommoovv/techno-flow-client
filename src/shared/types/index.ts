import { IEquipment } from '@/redux/domain/equipment/types'
import { IUser } from '@/redux/domain/user/types'

export type DataType = IUser[] | IUser | IEquipment[] | IEquipment

export interface IDataResponse<T> {
  status: string
  message: string
  data?: T
  error?: string
  statusCode: number
  timestamp: Date
}
