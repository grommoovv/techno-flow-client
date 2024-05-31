import { IDataResponse, IEquipment, IEquipmentUsageHistory } from '../types'

export const Equipment = {
  async getAll() {
    try {
      const req = await fetch('http://localhost:8000/api/v1/equipment')

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment[]>

      if (resp.data) {
        return resp.data as IEquipment[]
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getAvailable() {
    try {
      const req = await fetch('http://localhost:8000/api/v1/equipment/available')

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment[]>

      if (resp.data) {
        return resp.data as IEquipment[]
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getById(id: number) {
    try {
      const req = await fetch(`http://localhost:8000/api/v1/equipment/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment>

      if (resp.data) {
        return resp.data as IEquipment
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getUsageHistoryById(id: number) {
    try {
      const req = await fetch(`http://localhost:8000/api/v1/equipment/usage/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipmentUsageHistory[]>

      if (resp.data) {
        return resp.data as IEquipmentUsageHistory[]
      }

      throw new Error(`failed to fetch equipment usage history: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment usage history: ${e}`)
    }
  },

  async create(data: { title: string; status: string }) {
    try {
      const req = await fetch('http://localhost:8000/api/v1/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }
    } catch (e) {
      throw new Error(`failed to create equipment: ${e}`)
    }
  },

  async update(data: { id: number; title: string; status: string }) {
    try {
      const req = await fetch(`http://localhost:8000/api/v1/equipment/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          status: data.status,
        }),
      })

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }
    } catch (e) {
      throw new Error(`failed to create equipment: ${e}`)
    }
  },
}
