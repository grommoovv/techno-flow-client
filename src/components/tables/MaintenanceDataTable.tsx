import { FC } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import { IMaintenance } from '@/api/types'
import { formatData } from '@/shared/lib/helpers'

// import cls from './MaintenanceDataTable.module.scss'

const head = [
  { id: 1, text: 'ID' },
  { id: 2, text: 'Оборудование' },
  { id: 3, text: 'На обслуживании до' },
  { id: 4, text: 'Создано' },
]

interface MaintenanceDataTableProps {
  data: IMaintenance[]
}

const MaintenanceDataTable: FC<MaintenanceDataTableProps> = ({ data }) => {
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
        {data.map((info) => (
          <TableRow cols={4}>
            <TableCell>{info.id}</TableCell>
            <TableCell>{info.equipment_title}</TableCell>
            <TableCell>{formatData.format(new Date(info.fixed_in))}</TableCell>
            <TableCell>{formatData.format(new Date(info.created_at))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { MaintenanceDataTable }
