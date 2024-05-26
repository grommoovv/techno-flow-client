import { FC, useEffect } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table'
import { useAppDispatch, useAppSelector } from '@/redux'
import { selectEvent } from '@/redux/domain/event/slice'
import { getEvents } from '@/redux/domain/event/thunk'
import { Skeleton } from '../ui/skeleton'
import { formatData } from '@/shared/lib/helpers'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Название' },
  { id: 3, text: 'Тип' },
  { id: 4, text: 'Начало' },
  { id: 5, text: 'Статус' },
]

const EventDataTable: FC = () => {
  const { data, error, loading } = useAppSelector(selectEvent)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEvents())
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
            {data.map((e) => (
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
}

export { EventDataTable }
