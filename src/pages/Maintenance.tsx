import { FC } from 'react'
// import cls from './Maintenance.module.scss'

interface MaintenanceProps {}

const Maintenance: FC = (props) => {
  return (
    <section className='flex flex-col gap-10'>
      <div className='flex justify-between items-end'>
        <h1 className='h1'>
          Тех. Обслуживание
          <span className='text-slate-400 text-2xl ml-2'>{''}</span>
        </h1>
      </div>
    </section>
  )
}

export { Maintenance }
