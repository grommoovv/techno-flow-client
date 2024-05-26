import { FC } from 'react'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddUserValidation = z.object({
  username: z.string(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
})

const AddUserForm: FC = () => {
  const form = useForm<z.infer<typeof AddUserValidation>>({
    resolver: zodResolver(AddUserValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleAddUser = () => {}

  return (
    <>
      <Form {...form}>
        <div className='flex flex-center flex-col min-w-96 mt-5'>
          <form
            onSubmit={form.handleSubmit(handleAddUser)}
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
              Создать
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export { AddUserForm }
