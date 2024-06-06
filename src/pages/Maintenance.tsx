import { useGetMaintenance } from '@/api/queries/maintenance'
import { MaintenanceDataTable } from '@/components/tables/MaintenanceDataTable'
import { FC } from 'react'
// import cls from './Maintenance.module.scss'

interface MaintenanceProps {}

const Maintenance: FC = () => {
  const { data, isLoading, error } = useGetMaintenance()

  return (
    <section className='flex flex-col gap-10'>
      <div className='flex justify-between items-end'>
        <h1 className='h1'>
          Тех. Обслуживание
          <span className='text-slate-400 text-2xl ml-2'>{data?.length}</span>
        </h1>
      </div>

      <div>
        {error && <div>{error.message}</div>}

        {isLoading && <div>loading...</div>}

        {data && <MaintenanceDataTable data={data} />}
      </div>
    </section>
  )
}

export { Maintenance }
