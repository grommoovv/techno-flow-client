import { useGetEventsByUserId } from '@/api/events/queries'
import { EventCard } from '@/components/cards/EventCard'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuth } from '@/context/auth'
import { formatData } from '@/shared/lib/helpers'
import { FC } from 'react'
// import cls from './Me.module.scss'

const head = [
  {
    id: 1,
    text: 'Имя',
  },
  {
    id: 2,
    text: 'Username',
  },
  {
    id: 3,
    text: 'Email',
  },
  {
    id: 4,
    text: 'Дата регистрации',
  },
]

const info = [
  {
    id: 1,
    text: 'Имя',
  },
  {
    id: 2,
    text: 'Username',
  },
  {
    id: 3,
    text: 'Email',
  },
  {
    id: 4,
    text: 'Дата регистрации',
  },
]

interface MeProps {}

const Me: FC = () => {
  const { user } = useAuth()

  const { data, isLoading, error } = useGetEventsByUserId(user?.id)

  console.log('data:', data)

  return (
    <>
      <section
        style={{ gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 0.3fr)' }}
        className='grid gap-5'
      >
        <div className='flex flex-col gap-10'>
          <div className='w-full border-b pb-5'>
            <div className='w-[140px] h-[140px] bg-gray-400 rounded-full'></div>
          </div>
          <div className='border rounded-2xl p-5'>
            <div className='flex justify-between'>
              <h3 className='text-lg font-semibold leading-none tracking-tight'>
                Персональная информация
              </h3>
              <Button size='sm' variant='outline'>
                Изменить
              </Button>
            </div>
            <div className='mt-10'>
              <div className='grid grid-cols-4'>
                {head.map((h) => (
                  <div className='text-sm text-gray-400' key={h.id}>
                    {h.text}
                  </div>
                ))}
              </div>
              <div className='grid grid-cols-4'>
                <div className='font-medium'>{user?.fullname || 'Не указано'}</div>
                <div className='font-medium'>{user?.username}</div>
                <div className='font-medium'>{user?.email || 'Не указано'}</div>
                <div className='font-medium'>
                  {user.created_at ? formatData.format(new Date(user?.created_at)) : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-max border rounded-2xl p-5 pr-2'>
          <h3 className='text-lg font-semibold leading-none tracking-tight'>Мои мероприятия</h3>
          <ul className=' '>
            <ScrollArea className='flex flex-col gap-3 max-h-[770px] mt-3'>
              {data?.map((e) => (
                <li className='mb-3 mr-3' key={e.id}>
                  <EventCard event={e} />
                </li>
              ))}
            </ScrollArea>
          </ul>
        </div>
      </section>
    </>
  )
}

export { Me }
