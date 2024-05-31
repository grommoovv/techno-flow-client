import { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useAuth } from '@/context/auth'
import { Link } from 'react-router-dom'

const teamMembers = [
  {
    id: 1,
    name: 'Братченко Никита',
    group: 'ИВТ-262',
  },
  {
    id: 2,
    name: 'Борисов Андрей',
    group: 'ИВТ-262',
  },
  {
    id: 3,
    name: 'Громов Георгий',
    group: 'ИВТ-262',
  },
  {
    id: 4,
    name: 'Лютов Иван',
    group: 'ИВТ-262',
  },
  {
    id: 5,
    name: 'Медведев Артем',
    group: 'ИВТ-262',
  },
  {
    id: 6,
    name: 'Плешаков Артем',
    group: 'ИВТ-262',
  },
]

const DropdownProfileMenu: FC = () => {
  const { signOutAccount } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='justify-end rounded-full p-2 transition-all hover:bg-zinc-700'>
            <DotsHorizontalIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to={'/me'}>
              <DropdownMenuItem>Профиль</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Команда</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {teamMembers.map((m) => (
                    <DropdownMenuItem className='flex gap-4' key={m.id}>
                      <div className='flex-auto'>{m.name}</div>
                      <div>{m.group}</div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <a
            href='https://github.com/grommoovv/techno-flow-client'
            target='_blank'
            rel='noreferrer'
          >
            <DropdownMenuItem>GitHub</DropdownMenuItem>
          </a>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOutAccount}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { DropdownProfileMenu }
