import { IDataResponse, IEvent } from '../types'

export interface IEventCreateDto {
  title: string
  type: string
  start_date: Date
  end_date: Date
  user_id: number
  equipment_id: number[]
}

export const Event = {
  async getAll() {
    try {
      const req = await fetch('http://localhost:8000/api/v1/events')

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEvent[]>

      if (resp.data) {
        return resp.data as IEvent[]
      }

      throw new Error(`failed to fetch events: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch events: ${e}`)
    }
  },

  async getById(id: number) {
    try {
      const req = await fetch(`http://localhost:8000/api/v1/events/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEvent>

      if (resp.data) {
        return resp.data as IEvent
      }

      throw new Error(`failed to fetch event: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch event: ${e}`)
    }
  },

	async getByUserId(id: number) {
    try {
      const req = await fetch(`http://localhost:8000/api/v1/events/user/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEvent[]>

      if (resp.data) {
        return resp.data as IEvent[]
      }

      throw new Error(`failed to fetch event: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch event: ${e}`)
    }
	},

  async create(data: IEventCreateDto) {
    try {
      const req = await fetch('http://localhost:8000/api/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<{ event_id: number } | null>

      if (resp.data == null && resp.error != null) {
        throw new Error(`${resp.error}`)
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch events: ${e}`)
    }
  },
}
