import { IDataResponse } from '@/shared/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEvent } from './types'

export const getEvents = createAsyncThunk(
  'EVENT/getEvents',
  //
  async function (_, { rejectWithValue }) {
    try {
      const req = await fetch('http://localhost:8000/api/v1/events')

      if (!req.ok) {
        return rejectWithValue(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEvent[]>

      if (resp.data) {
        return resp.data as IEvent[]
      }

      return rejectWithValue(`failed to fetch events: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message)
      }
      return rejectWithValue(`failed to fetch events: ${e}`)
    }
  }
)
