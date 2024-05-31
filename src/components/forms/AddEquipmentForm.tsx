import { FC } from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useCreateEquipment } from '@/api/equipment/queries'

const AddEquipmentValidation = z.object({
  title: z.string(),
  status: z.string(),
})

const AddEquipmentForm: FC = () => {
  const form = useForm<z.infer<typeof AddEquipmentValidation>>({
    resolver: zodResolver(AddEquipmentValidation),
    defaultValues: {
      title: '',
      status: '',
    },
  })

  const { mutateAsync: createEquipmentMutation, isPending, error } = useCreateEquipment()

  const handleAddEquipment = async (data: z.infer<typeof AddEquipmentValidation>) => {
    const obj = {
      title: data.title,
      status: data.status,
    }

    console.log('data:', data)

    try {
      await createEquipmentMutation(obj)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form {...form}>
        <div className='flex flex-center flex-col min-w-96 mt-5'>
          <form
            onSubmit={form.handleSubmit(handleAddEquipment)}
            className='flex flex-col gap-5 w-full mt-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Название</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Состояние</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
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

export { AddEquipmentForm }
