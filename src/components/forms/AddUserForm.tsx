import { FC } from 'react'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateUser } from '@/api/queries/users'

const AddUserValidation = z.object({
  username: z
    .string()
    .min(4, { message: 'username must be at least 4 characters.' })
    .max(24, { message: 'max length 24 characters.' }),
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 characters.' })
    .max(32, { message: 'max length 32 characters.' }),
})

const AddUserForm: FC = () => {
  const form = useForm<z.infer<typeof AddUserValidation>>({
    resolver: zodResolver(AddUserValidation),
    defaultValues: { username: '', password: '' },
  })

  const { mutateAsync: createUserMutation, isPending, error } = useCreateUser()

  const handleSubmit = async (data: z.infer<typeof AddUserValidation>) => {
    await createUserMutation(data as { username: string; password: string })
    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <div className='flex flex-center flex-col min-w-96 mt-5'>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-5 w-full mt-4'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Логин</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Пароль</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='shad-button_primary'>
              Добавить
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export { AddUserForm }
