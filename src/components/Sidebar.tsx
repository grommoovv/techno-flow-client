import { FC } from 'react'
// import cls from './Sidebar.module.scss'
import { cn } from '@/shared/lib/utils'
import { Navbar } from './Navbar'
import { DropdownProfileMenu } from './DropdownProfileMenu'
import { useAuth } from '@/context/auth'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const { user } = useAuth()

  return (
    <>
      <div className={cn(`max-w-[300px] w-full`)}>
        <div
          className={cn(
            'max-w-[300px] w-full h-[calc(100vh-40px)] fixed p-5 bg-zinc-900 text-zinc-50 rounded-2xl'
          )}
        >
          <div className='text-2xl mb-16'>TecnhoFlow</div>
          <div className='flex items-center gap-2 h-16 p-5 bg-zinc-50 bg-opacity-10 rounded-2xl mb-16'>
            <div className='h-10 w-10 bg-zinc-50 rounded-full'></div>
            <div className='flex-auto'>{user?.username}</div>
            <DropdownProfileMenu />
          </div>
          <Navbar />
        </div>
      </div>
    </>
  )
}

export { Sidebar }
