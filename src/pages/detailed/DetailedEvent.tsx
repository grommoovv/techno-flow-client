import { useGetEquipmentByEventId } from '@/api/queries/equipment'
import { useGetEventById } from '@/api/queries/events'
import { EquipmentDataTable } from '@/components/tables/EquipmentDataTable'
import { EventInfoTable } from '@/components/tables/EventInfoTable'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
// import cls from './DetailedEvent.module.scss'

interface DetailedEventProps {}

const DetailedEvent: FC = () => {
  const { id: eventId } = useParams()

  const {
    data: event,
    isLoading: isEventLoading,
    error: isEventError,
  } = useGetEventById(Number(eventId))

  const {
    data: equipment,
    isLoading: isEquipmentLoading,
    error: isEquipmentError,
  } = useGetEquipmentByEventId(Number(eventId))

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='h1'>Мероприятие</h1>
        </div>

        <div>
          <h2 className='h2 mb-4'>Информация</h2>
          {event && <EventInfoTable info={event} />}
        </div>

        <div>
          <h2 className='h2 mb-4'>Используемое оборудование</h2>
          {equipment && <EquipmentDataTable equipment={equipment} />}
        </div>
      </section>
    </>
  )
}

export { DetailedEvent }
