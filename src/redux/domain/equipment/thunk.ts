import { IDataResponse } from '@/shared/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEquipment } from './types'

// <IEquipment[], void, { rejectValue: string }>

export const getEquipment = createAsyncThunk(
  'EQUIPMENT/getEquipment',
  //
  async function (_, { rejectWithValue }) {
    try {
      console.log('getEquipment called')

      const req = await fetch('http://localhost:8000/api/v1/equipment')

      if (!req.ok) {
        return rejectWithValue(`Http error: ${req.status}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment[]>

      console.log(resp)

      if (resp.data) {
        return resp.data as IEquipment[]
      }

      return rejectWithValue(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message)
      }
      return rejectWithValue(`failed to fetch equipment: ${e}`)
    }
  }
)
