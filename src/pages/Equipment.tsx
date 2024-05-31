import { FC } from 'react'
import { EquipmentDataTable } from '@/components/tables/EquipmentDataTable'
import { AddEquipmentSheet } from '@/features/AddEquipmentSheet'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetEquipment } from '@/api/equipment/queries'

interface EquipmentProps {}

const Equipment: FC<EquipmentProps> = () => {
  const { data: equipment, isLoading, error } = useGetEquipment()

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='h1'>
            Оборудование
            <span className='text-slate-400 text-2xl ml-2'>{equipment?.length}</span>
          </h1>
          <AddEquipmentSheet />
        </div>

        {isLoading && (
          <div className='flex flex-col gap-1'>
            {Array.from({ length: 16 }, (_, index) => (
              <Skeleton className='h-[37px]' key={index} />
            ))}
          </div>
        )}

        {error && <div>{error.message}</div>}

        {equipment && <EquipmentDataTable equipment={equipment} />}
      </section>
    </>
  )
}

export { Equipment }
