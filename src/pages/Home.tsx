import { OverviewCard } from '@/components/OverviewCard'
import { FC } from 'react'
import cls from './Home.module.scss'

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
        <section className={cls.overview}>
          <div>
            <div>TechnoFlow</div>
            <div>
              система мониторинга и управления состоянием оборудования малым предприятием
              молодежного творчества
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
