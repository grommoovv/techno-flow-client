import { useGetEquipment } from '@/api/queries/equipment'
import { useGetEvents } from '@/api/queries/events'
import { useGetMaintenance } from '@/api/queries/maintenance'
import { useGetUsers } from '@/api/queries/users'
import { MyEventsChart } from '@/components/cards/MyEventsChart'
import { MyReportsChart } from '@/components/cards/MyReportsChart'
import { OverviewCard } from '@/components/cards/OverviewCard'
import { DonutChart } from '@/components/charts/DonutChart'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/auth'
import { FC } from 'react'

export interface OverviewInfo {
  id: number
  title: string
  value: number
  description: string
}

const overviewInfo: OverviewInfo[] = [
  {
    id: 1,
    title: 'Пользователи',
    value: undefined,
    description: 'Количество пользователей в системе',
  },
  {
    id: 2,
    title: 'Мероприятия',
    value: undefined,
    description: 'Количество созданных мероприятий',
  },
  {
    id: 3,
    title: 'Оборудование',
    value: undefined,
    description: 'Общее количество оборудования',
  },
  {
    id: 4,
    title: 'Тех. Обслуживание',
    value: undefined,
    description: 'Оборудование на тех обслуживании',
  },
]

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { data: users, isLoading: isUsersLoading } = useGetUsers()
  const { data: events, isLoading: isEventsLoading } = useGetEvents()
  const { data: equipment, isLoading: isEquipmentLoading } = useGetEquipment()
  const { data: maintenance, isLoading: isMaintenanceLoading } = useGetMaintenance()

  overviewInfo[0].value = users?.length || 0
  overviewInfo[1].value = events?.length || 0
  overviewInfo[2].value = equipment?.length || 0
  overviewInfo[3].value = maintenance?.length || 0

  const isLoading = isUsersLoading || isEventsLoading || isEquipmentLoading || isMaintenanceLoading

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className=''>
          <h1 className='h1'>Главная</h1>
        </div>
        <div className='flex flex-col gap-2'>
          {isLoading && (
            <div className='grid grid-cols-4 gap-2'>
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton className='h-[200px] w-full rounded-3xl' key={index} />
              ))}
            </div>
          )}
          <div className='grid grid-cols-4 gap-2'>
            {overviewInfo.map((info) => (
              <OverviewCard info={info} key={info.id} />
            ))}
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <MyEventsChart />
            <MyReportsChart />
          </div>
        </div>
      </section>
    </>
  )
}

export { Home }
