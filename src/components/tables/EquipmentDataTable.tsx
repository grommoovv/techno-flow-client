import { IEquipment } from '@/api/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import { formatData } from '@/shared/lib/helpers'
import { FC } from 'react'
import { Link } from 'react-router-dom'
// import cls from './Equipments.module.scss'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Состояние' },
  { id: 4, text: 'Доступен' },
  { id: 5, text: 'Освободится' },
  { id: 6, text: 'Ближайшая бронь' },
  { id: 7, text: 'Пользователь' },
]

interface EquipmentDataTableProps {
  equipment: IEquipment[]
}

const EquipmentDataTable: FC<EquipmentDataTableProps> = ({ equipment }) => {
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
        {equipment.map((eq) => (
          <Link to={`/equipment/${eq.id}`}>
            <TableRow cols={7} key={eq.id}>
              <TableCell>{eq.id}</TableCell>
              <TableCell>{eq.title}</TableCell>
              <TableCell>{eq.status}</TableCell>
              <TableCell>{eq.is_available ? 'Да' : 'Нет'}</TableCell>
              {/* <TableCell>
                {eq.available_at ? formatData.format(new Date(eq.available_at)) : '-'}
              </TableCell>
              <TableCell>
                {eq.reserved_at ? formatData.format(new Date(eq.reserved_at)) : '-'}
              </TableCell>
              <TableCell>{eq.user_id ?? '-'}</TableCell> */}
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  )
}

export { EquipmentDataTable }
