import { FC } from 'react'

interface EventsProps {}

const Events: FC<EventsProps> = () => {
  return (
    <>
      <section className='flex flex-col gap-10'>
        <h1 className='text-6xl font-medium leading-none tracking-tight'>Мероприятия</h1>
      </section>
    </>
  )
}

export { Events }
