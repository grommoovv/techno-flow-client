import { FC } from 'react'
// import cls from './EventCard.module.scss'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Label } from '../ui/label'
import { IEvent } from '@/api/types'
import { formatData } from '@/shared/lib/helpers'
import { Badge } from '../ui/badge'
import { cn } from '@/shared/lib/utils'
import { Link } from 'react-router-dom'

interface EventCardProps {
  event: IEvent
  className?: string
}

const EventCard: FC<EventCardProps> = ({ event, className }) => {
  return (
    <Link className={cn(className)} to={`/events/${event.id}`}>
      <Card className={cn(className, 'shadow-none')}>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2 mb-2'>
            {event?.username && (
              <Label className='flex gap-8'>
                <div className='flex-auto'>Автор:</div>
                <div>{event?.username}</div>
              </Label>
            )}
          </div>
          <div className='flex flex-col gap-2 mb-8'>
            <Label className='flex gap-8'>
              <div className='flex-auto'>Начало:</div>
              <div>{event.start_date ? formatData.format(new Date(event.start_date)) : '-'}</div>
            </Label>
            <Label className='flex gap-8'>
              <div className='flex-auto'>Окончание:</div>
              <div>{event.end_date ? formatData.format(new Date(event.end_date)) : '-'}</div>
            </Label>
          </div>
          <div className='flex items-end justify-end'>
            <Badge
              variant={
                event.status === 'запланировано'
                  ? 'secondary'
                  : event.status === 'отменено'
                  ? 'destructive'
                  : 'default'
              }
              className={
                event.status === 'в процессе'
                  ? 'bg-green-600'
                  : event.status === 'завершено'
                  ? 'bg-yellow-600'
                  : 'default'
              }
            >
              {event.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { EventCard }
