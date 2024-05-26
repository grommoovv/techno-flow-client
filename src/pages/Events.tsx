import { EventDataTable } from '@/components/tables/EventDataTable'
import { AddEventSheet } from '@/features/AddEventSheet'
import { useAppSelector } from '@/redux'
import { selectEvent } from '@/redux/domain/event/slice'
import { FC } from 'react'

interface EventsProps {}

const Events: FC<EventsProps> = () => {
  const { data } = useAppSelector(selectEvent)

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='text-6xl font-medium leading-none tracking-tight'>
            Мероприятия
            <span className='text-slate-400 text-2xl ml-2'>{data?.length}</span>
          </h1>
          <AddEventSheet />
        </div>

        <EventDataTable />
      </section>
    </>
  )
}

export { Events }
