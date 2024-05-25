import { IDataResponse } from '@/shared/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from './types'

// <IUser[], void, { rejectValue: string }>

export const getUsers = createAsyncThunk(
  'USER/getUsers',
  //
  async function (_, { rejectWithValue }) {
    try {
      console.log('getUsers called')

      const req = await fetch('http://localhost:8000/api/v1/users')

      if (!req.ok) {
        return rejectWithValue(`Http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IUser[]>

      if (resp.data) {
        return resp.data as IUser[]
      }

      return rejectWithValue(`failed to fetch users: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message)
      }
      return rejectWithValue(`failed to fetch users: ${e}`)
    }
  }
)
