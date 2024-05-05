import { FC } from 'react'
import cls from './Sidebar.module.scss'
import { cn } from '@/lib/utils'
import { Navbar } from './Navbar'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <>
      <div className={cn(cls.sidebar, `max-w-[300px] w-full`)}>
        <div
          className={cn(
            cls.container,
            'max-w-[300px] w-full h-[calc(100vh-40px)] fixed p-5 bg-zinc-900 text-zinc-50 rounded-2xl'
          )}
        >
          <div className='text-2xl mb-16'>TecnhoFlow</div>
          <div className='h-16 bg-zinc-50 bg-opacity-10 rounded-2xl mb-16'>Username</div>
          <Navbar />
        </div>
      </div>
    </>
  )
}

export { Sidebar }
