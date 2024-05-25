import { UserDataTable } from '@/components/tables/UserDataTable'
import { AddUserSheet } from '@/features/AddUserSheet/AddUserSheet'
import { useAppSelector } from '@/redux'
import { selectUser } from '@/redux/domain/user/slice'
import { FC } from 'react'

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const { data } = useAppSelector(selectUser)
  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='text-6xl font-medium leading-none tracking-tight'>
            Пользователи
            <span className='text-slate-400 text-2xl ml-2'>{data?.length}</span>
          </h1>
          <AddUserSheet />
        </div>

        <UserDataTable />
      </section>
    </>
  )
}

export { Users }
