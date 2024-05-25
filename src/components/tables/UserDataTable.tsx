import { FC, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import { useAppDispatch, useAppSelector } from '@/redux'
import { getUsers } from '@/redux/domain/user/thunk'
import { selectUser } from '@/redux/domain/user/slice'
import { Skeleton } from '../ui/skeleton'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Логин' },
  { id: 3, text: 'ФИО' },
  { id: 4, text: 'Почта' },
]

const UserDataTable: FC = () => {
  const { data, error, loading } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
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
          <TableRow cols={4}>
            {head.map((h) => (
              <TableHead key={h.id}>{h.text}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((u) => (
            <TableRow cols={4} key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.fullname ?? '-'}</TableCell>
              <TableCell>{u.email ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export { UserDataTable }
