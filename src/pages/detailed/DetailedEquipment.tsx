import { useGetEquipmentById, useGetEquipmentUsageHistoryById } from '@/api/equipment/queries'
import { EquipmentInfoTable } from '@/components/tables/EquipmentInfoTable'
import { EquipmentUsageHistoryTable } from '@/components/tables/EquipmentUsageHistoryTable'
import { CreateReportDialog } from '@/features/CreateReportDialog'
import { EditEquipmentDialog } from '@/features/EditEquipmentDialog'
import { formatData } from '@/shared/lib/helpers'
import { FC } from 'react'
// import cls from './DetailedEquipment.module.scss'
import { useParams } from 'react-router-dom'

const DetailedEquipment: FC = () => {
  const { id: equipmentId } = useParams()

  const { data, isLoading, error } = useGetEquipmentById(Number(equipmentId))

  const {
    data: history,
    isLoading: isHistoryLoading,
    error: historyError,
  } = useGetEquipmentUsageHistoryById(Number(equipmentId))

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='text-6xl font-medium leading-none tracking-tight'>Профиль оборудования</h1>
        </div>

        <div>
          <h2 className='text-xl font-semibold leading-none tracking-tight mb-4'>Информация</h2>
          <EquipmentInfoTable info={data} />
          <div className='flex gap-4 mt-4'>
            <EditEquipmentDialog />
            <CreateReportDialog equipment={{ id: Number(equipmentId), title: data.title }} />
          </div>
        </div>

        <div>
          <h2 className='text-xl font-semibold leading-none tracking-tight mb-4'>
            История использования
          </h2>
          {history && <EquipmentUsageHistoryTable usage_history={history} />}
        </div>
      </section>
    </>
  )
}

export { DetailedEquipment }
