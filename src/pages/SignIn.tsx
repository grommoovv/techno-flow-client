import { FC } from 'react'
// import cls from './SignIn.module.scss'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useSignInAccount } from '@/api'

const SignInValidation = z.object({
  username: z.string(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
})

const SignIn: FC = () => {
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { isPending, mutateAsync: signInAccount } = useSignInAccount()

  const handleSignin = async (user: z.infer<typeof SignInValidation>) => {
    // const session = await signInAccount(user)
    // if (!session) {
    //   toast('failed to sign-in. Please try again.')
    //   return
    // }
    // if (isLoggedIn) {
    //   form.reset()
    //   navigate('/')
    // } else {
    //   toast('failed to sign-in. Please try again.')
    //   return
    // }
  }

  return (
    <>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr)' }}
        className='w-full h-[100vh] rounded-xl border border-zinc-200  text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'
      >
        <div className='h-full bg-slate-200 rounded-xl'></div>
        <div className='h-full flex flex-1 justify-center items-center flex-col py-10'>
          <h2 className='text-[28px] font-bold leading-[140%] tracking-tighter;'>
            Войдите в свой аккаунт
          </h2>
          <Form {...form}>
            <div className='flex flex-center flex-col min-w-96 mt-5'>
              <form
                onSubmit={form.handleSubmit(handleSignin)}
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
                  Войти
                </Button>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export { SignIn }
