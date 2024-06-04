import { FC } from 'react'
// import cls from './EventInfoTable.module.scss'

import { formatData } from '@/shared/lib/helpers'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table'
import { IEvent } from '@/api/types'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Статус' },
  { id: 4, text: 'Начало' },
  { id: 5, text: 'Конец' },
  { id: 6, text: 'Автор' },
]

interface EventInfoTableProps {
  info: IEvent
}

const EventInfoTable: FC<EventInfoTableProps> = ({ info }) => {
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
        <TableRow cols={6}>
          <TableCell>{info.id}</TableCell>
          <TableCell>{info.title}</TableCell>
          <TableCell>{info.status}</TableCell>
          <TableCell>{formatData.format(new Date(info.start_date))}</TableCell>
          <TableCell>{formatData.format(new Date(info.end_date))}</TableCell>
          <TableCell>{info.username}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export { EventInfoTable }
