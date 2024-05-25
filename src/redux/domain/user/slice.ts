import { AppState } from '@/redux'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from './types'
import { getUsers } from './thunk'

interface initialState {
  data: IUser[] | null
  error: string | null
  loading: boolean
}

const initialState: initialState = {
  data: null,
  error: null,
  loading: false,
}

const name = 'USER'

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (s) => {
        s.loading = true
      })
      .addCase(getUsers.fulfilled, (s, a) => {
        s.error = null
        s.loading = false
        s.data = a.payload
      })
      .addCase(getUsers.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
  },
})

// export const {} = userSlice.actions

export const selectUser = (state: AppState) => state.USER
