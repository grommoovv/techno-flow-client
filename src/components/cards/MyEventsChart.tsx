import { FC } from 'react'
import { DonutChart } from '../charts/DonutChart'
import { useGetEvents, useGetEventsByUserId } from '@/api/queries/events'
import { useAuth } from '@/context/auth'
import { calcPercent } from '@/shared/lib/helpers'
import { Skeleton } from '../ui/skeleton'
// import cls from './MyEventsChart.module.scss'

interface MyEventsChartProps {}

const MyEventsChart: FC = () => {
  const { user } = useAuth()
  const { data: events, isLoading: isEventsLoading } = useGetEvents()

  const { data: myEvents, isLoading: isMyEventsLoading } = useGetEventsByUserId(user?.id)

  const percent = calcPercent(myEvents?.length ?? 1, events?.length ?? 1)

  if (!events || !myEvents) {
    return
  }

  if (isEventsLoading || isMyEventsLoading) {
    return <Skeleton className='w-full h-[298px] rounded-3xl ' />
  }

  return (
    <div className='flex items-center gap-10 rounded-3xl bg-zinc-100 text-zinc-800 p-6'>
      <div className='w-[250px] h-[250px]'>
        <DonutChart x={myEvents?.length} y={events?.length} />
      </div>
      <div className='flex flex-col gap-3'>
        <h3 className='h2'>Мои мероприятия</h3>
        <div className='flex gap-3'>
          <h3 className='h1'>{myEvents?.length}</h3>
          <span className='text-slate-400 font-medium '>{percent}%</span>
        </div>
        <div className='text-secondary'>Количество созданных мероприятий за все время</div>
      </div>
    </div>
  )
}

export { MyEventsChart }
