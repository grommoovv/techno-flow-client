import { FC } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import { IUser } from '@/api/types'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Логин' },
  { id: 3, text: 'ФИО' },
  { id: 4, text: 'Почта' },
]

interface UserDataTableProps {
  users: IUser[]
}

const UserDataTable: FC<UserDataTableProps> = ({ users }) => {
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
        {users.map((u) => (
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

export { UserDataTable }
