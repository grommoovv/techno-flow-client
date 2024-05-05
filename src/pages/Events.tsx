import { Button } from '@/components/ui/button'
import { FC } from 'react'
// import cls from './Events.module.scss'

interface EventsProps {}

const Events: FC<EventsProps> = () => {
  return (
    <>
      <div className={''}>
        <Button>events page</Button>
      </div>
    </>
  )
}

export { Events }
