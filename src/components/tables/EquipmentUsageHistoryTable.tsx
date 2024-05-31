import { FC } from 'react'
// import cls from './EquipmentUsageHistoryTable.module.scss'
import { IEquipmentUsageHistory } from '@/api/types'
import { formatData } from '@/shared/lib/helpers'
import { Link } from 'react-router-dom'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Мероприятие' },
  { id: 3, text: 'Username' },
  { id: 4, text: 'Начало' },
  { id: 5, text: 'Конец' },
]

interface EquipmentUsageHistoryTableProps {
  usage_history: IEquipmentUsageHistory[]
}

const EquipmentUsageHistoryTable: FC<EquipmentUsageHistoryTableProps> = ({ usage_history }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow cols={5}>
          {head.map((h) => (
            <TableHead key={h.id}>{h.text}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {usage_history.map((eq) => (
          <TableRow cols={5} key={eq.id}>
            <TableCell>{eq.id}</TableCell>
            <TableCell>{eq.event_title}</TableCell>
            <TableCell>{eq.username}</TableCell>
            <TableCell>
              {eq.start_date ? formatData.format(new Date(eq.start_date)) : '-'}
            </TableCell>
            <TableCell>{eq.end_date ? formatData.format(new Date(eq.end_date)) : '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { EquipmentUsageHistoryTable }
