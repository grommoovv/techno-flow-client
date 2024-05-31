import { Sidebar } from '@/components/Sidebar'
import { useAuth } from '@/context/auth'
import { FC, useEffect } from 'react'
// import cls from './AuthLayout.module.scss'
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface AuthLayoutProps {}

const AuthLayout: FC<AuthLayoutProps> = () => {
  const navigate = useNavigate()
  const { isUserAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/')
      return
    }
  }, [])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export { AuthLayout }
