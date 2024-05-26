import { createSlice } from '@reduxjs/toolkit'
import { IEvent } from './types'
import { getEvents } from './thunk'
import { AppState } from '@/redux'

interface initialState {
  data: IEvent[] | null
  error: string | null
  loading: boolean
}

const initialState: initialState = {
  data: null,
  error: null,
  loading: false,
}

const name = 'EVENT'

export const eventSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (s) => {
        s.loading = true
      })
      .addCase(getEvents.fulfilled, (s, a) => {
        s.loading = false
        s.data = a.payload
      })
      .addCase(getEvents.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
  },
})

export const selectEvent = (state: AppState) => state.EVENT
