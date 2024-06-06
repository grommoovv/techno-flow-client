import { useGetEvents } from '@/api/queries/events'
import { EventCard } from '@/components/cards/EventCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AddEventSheet } from '@/features/AddEventSheet'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

export enum StatusEnum {
  ALL = 'все',
  PLANNED = 'запланировано',
  ONGOING = 'в процессе',
  FINISHED = 'завершено',
}

export const filterByStatusVariants = [
  { id: 0, name: 'Все', value: StatusEnum.ALL },
  { id: 1, name: 'Запланировано', value: StatusEnum.PLANNED },
  { id: 2, name: 'В процессе', value: StatusEnum.ONGOING },
  { id: 3, name: 'Завершено', value: StatusEnum.FINISHED },
]

interface EventsProps {}

const Events: FC<EventsProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const eventStatus = (searchParams.get('status') as StatusEnum) || StatusEnum.ALL

  const { data: events, isLoading, error } = useGetEvents()

  const setStatus = (value: StatusEnum) => {
    if (value === StatusEnum.ALL) {
      setSearchParams(new URLSearchParams())
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.set('status', value)
      setSearchParams(params)
    }
  }

  const filteredEvents = events?.filter(
    (e) => eventStatus === StatusEnum.ALL || e.status === eventStatus
  )

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

        <div>
          <h3 className='h3'>Фильтр</h3>
          <div className='flex gap-2 mt-4'>
            {filterByStatusVariants.map((variant) => (
              <Button
                variant={variant.value === eventStatus ? 'default' : 'outline'}
                onClick={() => setStatus(variant.value)}
                size='sm'
                key={variant.id}
              >
                {variant.name}
              </Button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className='flex flex-wrap gap-4'>
            {Array.from({ length: 10 }, (_, index) => (
              <Skeleton className='h-[200px] w-[260px] rounded-xl' key={index} />
            ))}
          </div>
        )}

        {error && <div>{error.message}</div>}

        {filteredEvents && (
          <>
            {filteredEvents.length > 0 ? (
              <div className='grid grid-cols-5 gap-4'>
                {filteredEvents.map((e) => (
                  <EventCard className='w-full' event={e} key={e.id} />
                ))}
              </div>
            ) : (
              <div className='text-center text-slate-400 mt-4'>Тут пусто...</div>
            )}
          </>
        )}
      </section>
    </>
  )
}

export { Events }

//
