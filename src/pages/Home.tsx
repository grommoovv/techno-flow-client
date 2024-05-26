import { OverviewCard } from '@/components/OverviewCard'
import { FC } from 'react'

export interface OverviewInfo {
  id: number
  title: string
  content: string
}

const overviewInfo: OverviewInfo[] = [
  {
    id: 1,
    title: 'Оборудование',
    content: '75',
  },
  {
    id: 2,
    title: 'Мероприятия',
    content: '13',
  },
  {
    id: 3,
    title: 'Пользователи',
    content: '10',
  },
]

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <section className=''>
          <h1 className='text-6xl font-medium leading-none tracking-tight'>
            Привет, &nbsp;
            <span className='text-purple-400'>Username</span>
          </h1>
        </section>
        <section className='grid grid-cols-4 gap-5'>
          <div className='font-medium leading-7'>
            <div>TechnoFlow</div>
            <div>
              <div>Мониторинг и управление</div>
              <div>оборудованием</div>
            </div>
          </div>
          {overviewInfo.map((info) => (
            <OverviewCard data={info} key={info.id} />
          ))}
        </section>
      </div>
    </>
  )
}

export { Home }
