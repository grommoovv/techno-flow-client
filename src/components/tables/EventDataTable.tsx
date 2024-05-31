import { FC } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table'
import { formatData } from '@/shared/lib/helpers'
import { IEvent } from '@/api/types'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Тип' },
  { id: 4, text: 'Начало' },
  { id: 5, text: 'Статус' },
]

interface EventDataTableProps {
  events: IEvent[]
}

const EventDataTable: FC<EventDataTableProps> = ({ events }) => {
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
          {events.map((e) => (
            <TableRow cols={5} key={e.id}>
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.title}</TableCell>
              <TableCell>{e.type}</TableCell>
              <TableCell>
                {e.start_date ? formatData.format(new Date(e.start_date)) : '-'}
              </TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export { EventDataTable }
