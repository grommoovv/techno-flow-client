import { OverviewInfo } from '@/pages/Home'
import { FC } from 'react'

// import cls from './OverviewCard.module.scss'

interface OverviewCardProps {
  data: OverviewInfo
}

const OverviewCard: FC<OverviewCardProps> = ({ data }) => {
  return (
    <>
      <div className='flex flex-col gap-4 p-5 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
        <h3 className='font-medium leading-none tracking-tight'>{data.title}</h3>
        <div className='font-semibold text-3xl'>{data.content}</div>
      </div>
    </>
  )
}

export { OverviewCard }
