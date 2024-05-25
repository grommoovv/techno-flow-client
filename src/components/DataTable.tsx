import { FC } from 'react'
import cls from './DataTable.module.scss'

interface DataTableProps {}

const DataTable: FC<DataTableProps> = () => {
  return (
    <>
      <div className={cls.table}>
        <div className={cls.header}>
          <div className={cls.row}></div>
        </div>
        <div className={cls.body}>
          <div className={cls.row}></div>
        </div>
      </div>
    </>
  )
}

export { DataTable }
