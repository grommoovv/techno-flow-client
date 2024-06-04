import { FC } from 'react'
import { EquipmentDataTable } from '@/components/tables/EquipmentDataTable'
import { AddEquipmentSheet } from '@/features/AddEquipmentSheet'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetEquipment } from '@/api/queries/equipment'
import { useSearchParams } from 'react-router-dom'

type AvailabilityFilter = 'true' | 'false' | null

export const filterByAvailabilityVariants = [
  { id: 0, name: 'Все', value: null },
  { id: 1, name: 'Доступные', value: 'true' },
  { id: 2, name: 'Недоступные', value: 'false' },
]

interface EquipmentProps {}

const Equipment: FC<EquipmentProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const availabilityFilter = searchParams.get('available') as AvailabilityFilter | null

  const { data: equipment, isLoading, error } = useGetEquipment()

  const setAvailability = (value: AvailabilityFilter) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('available', value)
    } else {
      params.delete('available')
    }
    setSearchParams(params)
  }

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

        <div>
          <h3 className='h3'>Фильтр</h3>
          <div className='flex gap-2 mt-4'>
            {filterByAvailabilityVariants.map((variant) => (
              <Button
                key={variant.id}
                variant={availabilityFilter === variant.value ? 'default' : 'outline'}
                onClick={() => setAvailability(variant.value as AvailabilityFilter)}
                size='sm'
              >
                {variant.name}
              </Button>
            ))}
          </div>
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
