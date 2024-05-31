import { FC } from 'react'
import cls from './EquipmentInfoTable.module.scss'
import { IEquipment } from '@/api/types'
import { formatData } from '@/shared/lib/helpers'
import { Link } from 'react-router-dom'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Состояние' },
  { id: 4, text: 'Доступен' },
  { id: 5, text: 'Дата создания' },
]

interface EquipmentInfoTableProps {
  info: IEquipment
}

const EquipmentInfoTable: FC<EquipmentInfoTableProps> = ({ info }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow cols={5}>
            {head.map((h) => (
              <TableHead key={h.id}>{h.text}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow cols={5}>
            <TableCell>{info.id}</TableCell>
            <TableCell>{info.title}</TableCell>
            <TableCell>{info.status}</TableCell>
            <TableCell>{info.is_available ? 'Да' : 'Нет'}</TableCell>
            <TableCell>
              {info.created_at ? formatData.format(new Date(info.created_at)) : '-'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export { EquipmentInfoTable }
