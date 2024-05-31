import { useGetUsers } from '@/api/users/queries'
import { UserDataTable } from '@/components/tables/UserDataTable'
import { Skeleton } from '@/components/ui/skeleton'
import { AddUserSheet } from '@/features/AddUserSheet'
import { FC } from 'react'

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const { data: users, isLoading, error } = useGetUsers()

  return (
    <>
      <section className='flex flex-col gap-10'>
        <div className='flex justify-between items-end'>
          <h1 className='h1'>
            Пользователи
            <span className='text-slate-400 text-2xl ml-2'>{users?.length}</span>
          </h1>
          <AddUserSheet />
        </div>

        {isLoading && (
          <div className='flex flex-col gap-1'>
            {Array.from({ length: 16 }, (_, index) => (
              <Skeleton className='h-[37px]' key={index} />
            ))}
          </div>
        )}

        {error && <div>{error.message}</div>}

        {users && <UserDataTable users={users} />}
      </section>
    </>
  )
}

export { Users }
