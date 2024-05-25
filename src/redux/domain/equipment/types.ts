export interface IEquipment {
  id: number
  title: string
  state: string
  is_available: boolean
  available_at?: Date
  reserved_at?: Date
  created_at: Date
  user_id?: number
}
