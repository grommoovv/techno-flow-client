import { FC } from 'react'
import cls from './OverviewCard.module.scss'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { cn } from '@/shared/lib/utils'
import { OverviewInfo } from '@/pages/Home'

interface OverviewCardProps {
  info: OverviewInfo
  className?: string
}

const OverviewCard: FC<OverviewCardProps> = ({ info, className }) => {
  return (
    <>
      <Card
        className={cn(
          cls.card,
          className,
          'bg-zinc-100 text-zinc-900 shadow-none border-0 rounded-3xl first:bg-zinc-900 first:text-zinc-100'
        )}
      >
        <CardHeader>
          <CardTitle>{info.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-5xl'>{info.value}</div>
        </CardContent>
        <CardFooter>
          <CardDescription className={cls.description}>{info.description}</CardDescription>
        </CardFooter>
      </Card>
    </>
  )
}

export { OverviewCard }
