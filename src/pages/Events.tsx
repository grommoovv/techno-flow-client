import { useGetEvents } from '@/api/events/queries'
import { EventCard } from '@/components/cards/EventCard'
import { EventDataTable } from '@/components/tables/EventDataTable'
import { Skeleton } from '@/components/ui/skeleton'
import { AddEventSheet } from '@/features/AddEventSheet'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface EventsProps {}

const Events: FC<EventsProps> = () => {
  const { data: events, isLoading, error } = useGetEvents()

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='h1'>
            Мероприятия
            <span className='text-slate-400 text-2xl ml-2'>{events?.length}</span>
          </h1>
          <AddEventSheet />
        </div>

        {isLoading && (
          <div className='flex flex-wrap gap-4'>
            {Array.from({ length: 10 }, (_, index) => (
              <Skeleton className='h-[200px] w-[260px] rounded-xl' key={index} />
            ))}
          </div>
        )}

        {error && <div>{error.message}</div>}

        {events && (
          <div className='flex flex-wrap gap-4'>
            {events.map((e) => (
              <EventCard className='w-max' event={e} key={e.id} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export { Events }
