import { Sidebar } from '@/components/Sidebar'
import { FC } from 'react'
// import cls from './RootLayout.module.scss'
import { Navigate, Outlet } from 'react-router-dom'

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  const isUserLoggedIn = true

  if (!isUserLoggedIn) {
    return <Navigate to={'/sign-in'} />
  }

  return (
    <>
      <div className={'flex gap-5 max-w-[1920px] w-full'}>
        <Sidebar />
        <main className='w-full'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export { RootLayout }
