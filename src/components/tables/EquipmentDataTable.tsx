import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import { formatData } from '@/shared/lib/helpers'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux'
import { selectEquipment } from '@/redux/domain/equipment/slice'
import { getEquipment } from '@/redux/domain/equipment/thunk'
import { Skeleton } from '../ui/skeleton'
// import cls from './Equipments.module.scss'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Состояние' },
  { id: 4, text: 'Статус' },
  { id: 5, text: 'Освободится' },
  { id: 6, text: 'Зарезервирован' },
  { id: 7, text: 'Пользователь' },
]

const EquipmentDataTable: FC = () => {
  const dispatch = useAppDispatch()
  const { data, error, loading } = useAppSelector(selectEquipment)

  useEffect(() => {
    dispatch(getEquipment())
  }, [dispatch])

  if (loading) {
    return (
      <div className='flex flex-col gap-1'>
        {Array.from({ length: 16 }, (_, index) => (
          <Skeleton className='h-[37px]' key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  if (data) {
    return (
      <Table>
        <TableHeader>
          <TableRow cols={7}>
            {head.map((h) => (
              <TableHead key={h.id}>{h.text}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((eq) => (
            <TableRow cols={7} key={eq.id}>
              <TableCell>{eq.id}</TableCell>
              <TableCell>{eq.title}</TableCell>
              <TableCell>{eq.state}</TableCell>
              <TableCell>{eq.is_available ? 'Свободен' : 'Занят'}</TableCell>
              <TableCell>
                {eq.available_at ? formatData.format(new Date(eq.available_at)) : '-'}
              </TableCell>
              <TableCell>
                {eq.reserved_at ? formatData.format(new Date(eq.reserved_at)) : '-'}
              </TableCell>
              <TableCell>{eq.user_id ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export { EquipmentDataTable }
