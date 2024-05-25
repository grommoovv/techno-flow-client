import { AppState } from '@/redux'
import { createSlice } from '@reduxjs/toolkit'
import { getEquipment } from './thunk'
import { IEquipment } from './types'

interface initialState {
  data: IEquipment[] | null
  error: string | null
  loading: boolean
}

const initialState: initialState = {
  data: null,
  error: null,
  loading: false,
}

const name = 'EQUIPMENT'

export const equipmentSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEquipment.pending, (s) => {
        s.loading = true
      })
      .addCase(getEquipment.fulfilled, (s, a) => {
        s.loading = false
        s.error = null
        s.data = a.payload
      })
      .addCase(getEquipment.rejected, (s, a) => {
        console.log('rejected 1')
        s.loading = false
        console.log('rejected 2')
        s.error = a.payload as string
      })
  },
})

// export const {} = equipmentSlice.actions

export const selectEquipment = (state: AppState) => state.EQUIPMENT
