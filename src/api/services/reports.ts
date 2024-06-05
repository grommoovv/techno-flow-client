import { __API__ } from "../constants";

export const Report = {
  async create(data: { message: string; user_id: number; equipment_id: number }) {
    try {
      const req = await fetch(`${__API__}/reports`, {
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
      throw new Error(`failed to create user: ${e}`)
    }
  },
}
