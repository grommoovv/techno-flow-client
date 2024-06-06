import { FC } from 'react'
import { DonutChart } from '../charts/DonutChart'
import { useAuth } from '@/context/auth'
import { useGetReports, useGetReportsByUserId } from '@/api/queries/reports'
import { calcPercent } from '@/shared/lib/helpers'
import { Skeleton } from '../ui/skeleton'
// import cls from './MyReportsChart.module.scss'

interface MyReportsChartProps {}

const MyReportsChart: FC = () => {
  const {
    user: { id },
  } = useAuth()
  const { data: reports, isLoading: isReportsLoading } = useGetReports()

  const { data: myReports, isLoading: isMyReportsLoading } = useGetReportsByUserId(id)

  const percent = calcPercent(myReports?.length, reports?.length)

  if (!reports || !myReports) {
    return
  }

  if (isReportsLoading || isMyReportsLoading) {
    return <Skeleton className='w-full h-[298px] rounded-3xl ' />
  }

  return (
    <div className='flex items-center gap-10 rounded-3xl bg-zinc-100 text-zinc-800 p-6'>
      <div className='w-[250px] h-[250px]'>
        <DonutChart x={myReports?.length} y={reports?.length} />
      </div>
      <div className='flex flex-col gap-3'>
        <h3 className='h2'>Мои обращения</h3>
        <div className='flex gap-3'>
          <h3 className='h1'>{myReports?.length}</h3>
          <span className='text-slate-400 font-medium '>{percent}%</span>
        </div>
        <div className='text-secondary'>Количество созданных обращений за все время</div>
      </div>
    </div>
  )
}

export { MyReportsChart }
