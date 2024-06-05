import { $api } from '@/api/axios'
import { SignInDto } from '@/api/services/users'
import { IDataResponse, ISignInResponse, IUser } from '@/api/types'
import axios from 'axios'
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface IAuthContext {
  user: IUser | null
  isUserAuthenticated: boolean
  isLoading: boolean
  signInAccount: (credentials: SignInDto) => Promise<void>
  signOutAccount: () => Promise<void>
  checkIsUserAuthenticated: () => Promise<void>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const userFromLocalStorage = localStorage.getItem('current_user')
  const parsedCurrentUser = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null

  const isAuthFromLocalStorage = localStorage.getItem('is_auth')
  const parsedIsAuth = isAuthFromLocalStorage ? JSON.parse(isAuthFromLocalStorage) : false

  const [user, setUser] = useState<IUser | null>(parsedCurrentUser)
  const [isUserAuthenticated, setUserAuthenticated] = useState(parsedIsAuth)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      checkIsUserAuthenticated()
    }
  }, [])

  const signInAccount = async (credentials: SignInDto): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await $api.post<IDataResponse<ISignInResponse>>('/auth/sign-in', credentials)

      if (response.data.data) {
        setUser(response.data.data.user)
        setUserAuthenticated(true)

        localStorage.setItem('current_user', JSON.stringify(response.data.data.user))
        localStorage.setItem('is_auth', JSON.stringify(true))
        localStorage.setItem('access_token', response.data.data.access_token)

        toast.success('Вход выполнен успешно. Добро пожаловать!')
        navigate('/')
        return
      }

      throw new Error(`failed to sign-in: ${response.statusText}`)
    } catch (e) {
      toast.error('Ошибка входа. Проверьте правильность введенных данных.')
      throw new Error(`failed to sign-in: ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const signOutAccount = async (): Promise<void> => {
    localStorage.removeItem('is_auth')
    localStorage.removeItem('current_user')
    localStorage.removeItem('access_token')

    setUser(null)
    setUserAuthenticated(false)
    navigate('/sign-in')
  }

  const checkIsUserAuthenticated = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await axios.get<IDataResponse<ISignInResponse>>(
        'http://localhost:8000/api/v1/auth/refresh',
        {
          withCredentials: true,
        }
      )

      if (response.data.data) {
        setUser(response.data.data?.user)
        setUserAuthenticated(true)

        localStorage.setItem('current_user', JSON.stringify(response.data.data.user))
        localStorage.setItem('is_auth', JSON.stringify(true))
        localStorage.setItem('access_token', response.data.data.access_token)
      }
    } catch (e) {
      console.log(e.response?.data?.message)
      throw new Error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isUserAuthenticated,
    isLoading,
    signInAccount,
    signOutAccount,
    checkIsUserAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
