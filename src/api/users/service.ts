import { IUser } from '@/redux/domain/user/types'
import { IDataResponse } from '@/shared/types'

export interface SignInAccountDto {
  username: string
  password: string
}

export const signInAccount = async (credentials: SignInAccountDto) => {
  try {
    const req = await fetch('http://localhost:8000/api/v1/auth/sign-in', {
      body: JSON.stringify(credentials),
    })

    if (!req.ok) {
      throw new Error(`Http error: ${req.status}`)
    }

    const resp = (await req.json()) as IDataResponse<IUser>

    if (resp.data) {
      return resp.data as IUser
    }

    throw new Error(`failed to sign-in: ${resp.error}`)
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`failed to sign-in: ${e.message}`)
    }
    throw new Error(`failed to sign-in: ${e}`)
  }
}
