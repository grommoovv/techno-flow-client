import { IEquipment } from '@/api/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import { formatData } from '@/shared/lib/helpers'
import { FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
// import cls from './Equipments.module.scss'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Состояние' },
  { id: 4, text: 'Доступен' },
  { id: 5, text: 'Освободится' },
  { id: 6, text: 'Ближайшая бронь' },
]

interface EquipmentDataTableProps {
  equipment: IEquipment[]
}

const EquipmentDataTable: FC<EquipmentDataTableProps> = ({ equipment }) => {
  const [searchParams, _] = useSearchParams()
  const availabilityFilter = searchParams.get('available')

  const filteredEquipment = equipment.filter((eq) => {
    if (availabilityFilter === 'true') {
      return eq.is_available === true
    }
    if (availabilityFilter === 'false') {
      return eq.is_available === false
    }
    return true
  })

  return (
    <Table>
      <TableHeader>
        <TableRow cols={6}>
          {head.map((h) => (
            <TableHead key={h.id}>{h.text}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((eq) => (
            <Link to={`/equipment/${eq.id}`} key={eq.id}>
              <TableRow cols={6}>
                <TableCell>{eq.id}</TableCell>
                <TableCell>{eq.title}</TableCell>
                <TableCell>{eq.status}</TableCell>
                <TableCell>{eq.is_available ? 'Да' : 'Нет'}</TableCell>
              </TableRow>
            </Link>
          ))
        ) : (
          <div className='text-center text-slate-400 m-4'>Тут пусто...</div>
        )}
      </TableBody>
    </Table>
  )
}

export { EquipmentDataTable }
