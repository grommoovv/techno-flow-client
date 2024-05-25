import { FC } from 'react'
import { EquipmentDataTable } from '@/components/tables/EquipmentDataTable'
import { AddEquipmentSheet } from '@/features/AddEquipmentSheet/AddEquipmentSheet'
import { useAppSelector } from '@/redux'
import { selectEquipment } from '@/redux/domain/equipment/slice'
// import cls from './Equipments.module.scss'

interface EquipmentsProps {}

const Equipments: FC<EquipmentsProps> = () => {
  const { data } = useAppSelector(selectEquipment)
  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='text-6xl font-medium leading-none tracking-tight'>
            Пользователи
            <span className='text-slate-400 text-2xl ml-2'>{data?.length}</span>
          </h1>
          <AddEquipmentSheet />
        </div>
        <EquipmentDataTable />
      </section>
    </>
  )
}

export { Equipments }
