import { FC } from 'react'
import cls from './Navbar.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'

import { RxCalendar, RxDesktop, RxHome, RxPerson } from 'react-icons/rx'

const navLinks = [
  {
    id: 1,
    url: '/',
    label: 'Главная',
    icon: <RxHome size={16} />,
  },
  {
    id: 2,
    url: '/users',
    label: 'Пользователи',
    icon: <RxPerson size={16} />,
  },
  {
    id: 3,
    url: '/events',
    label: 'Мероприятия',
    icon: <RxCalendar size={16} />,
  },
  {
    id: 4,
    url: '/equipments',
    label: 'Оборудование',
    icon: <RxDesktop size={16} />,
  },
]

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const { pathname } = useLocation()

  return (
    <>
      <div className={cls.navbar}>
        <div className='flex flex-col gap-1'>
          {navLinks.map((link) => (
            <Link
              className={cn(
                cls.link,
                pathname == link.url && `bg-zinc-50 text-zinc-900`,
                'flex items-center text-sm rounded-lg px-5 py-2 gap-2'
              )}
              to={link.url}
              key={link.id}
            >
              <div
                className={cn(
                  cls.icon,
                  pathname == link.url && `bg-zinc-900 text-zinc-50`,
                  `p-2 rounded-lg`
                )}
              >
                {link.icon}
              </div>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export { Navbar }

// transition-all ease-linear duration-300
