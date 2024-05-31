import { FC } from 'react'
import { useParams } from 'react-router-dom'
// import cls from './DetailedEvent.module.scss'

interface DetailedEventProps {}

const DetailedEvent: FC = () => {
  const { id } = useParams()

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='h1'>Мероприятие</h1>
        </div>

        <div>
          <h2 className='h2 mb-4'>Информация</h2>
        </div>

        <div>
          <h2 className='h2 mb-4'>Используемое оборудование</h2>
        </div>
      </section>
    </>
  )
}

export { DetailedEvent }
