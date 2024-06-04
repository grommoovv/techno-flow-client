import { Sidebar } from '@/components/Sidebar'
import { useAuth } from '@/context/auth'
import { FC, Suspense, useEffect } from 'react'
// import cls from './RootLayout.module.scss'
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  const navigate = useNavigate()
  const { isUserAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/sign-in')
      return
    }
  }, [])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <div className={'flex gap-5 p-5 max-w-[1920px] w-full bg-gray-200'}>
        <Sidebar />
        <main className='w-full bg-white p-5 rounded-2xl min-h-[calc(100vh-40px)]'>
          <Suspense fallback={'loading...'}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  )
}

export { RootLayout }
