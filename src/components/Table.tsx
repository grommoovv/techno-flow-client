import { cn } from '@/shared/lib/utils'
import { FC, PropsWithChildren } from 'react'
import cls from './Table.module.scss'

const Table: FC<PropsWithChildren> = ({ children }) => (
  <div className='relative w-full overflow-auto'>
    <div className={cn('w-full text-sm')}>{children}</div>
  </div>
)

const TableHeader: FC<PropsWithChildren> = ({ children }) => (
  <div className={cn('')}>{children}</div>
)

const TableBody: FC<PropsWithChildren> = ({ children }) => <div className={cn('')}>{children}</div>

const TableFooter: FC<PropsWithChildren> = ({ children }) => (
  <div className={cn('bg-zinc-100/50 font-medium dark:bg-zinc-800/50')}>{children}</div>
)

interface TableRow extends PropsWithChildren {
  cols: number
}

const TableRow: FC<TableRow> = ({ children, cols }) => (
  <div
    style={{ gridTemplateColumns: `minmax(0, 36px) repeat(${cols - 1}, minmax(0, 1fr))` }}
    className={cn(cls.TableRow, '')}
  >
    {children}
  </div>
)

const TableHead: FC<PropsWithChildren> = ({ children }) => (
  <div className={cn(cls.TableHead, 'p-2 font-medium text-zinc-500')}>{children}</div>
)

const TableCell: FC<PropsWithChildren> = ({ children }) => (
  <div className={cn(cls.TableCell, '')}>{children}</div>
)

const TableCaption: FC<PropsWithChildren> = ({ children }) => (
  <div className={cn('mt-4 text-sm text-zinc-500 dark:text-zinc-400')}>{children}</div>
)

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }