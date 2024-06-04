import { FC } from 'react'
// import cls from './EditEquipmentForm.module.scss'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useUpdateEquipment } from '@/api/queries/equipment'

const UpdateEquipmentValidation = z.object({
  title: z.string(),
  status: z.string(),
})

interface EditEquipmentFormProps {}

const EditEquipmentForm: FC = (props) => {
  const form = useForm<z.infer<typeof UpdateEquipmentValidation>>({
    resolver: zodResolver(UpdateEquipmentValidation),
    defaultValues: {
      title: '',
      status: '',
    },
  })

  const { id } = useParams()
  const { mutateAsync: useUpdateEquipmentMutation } = useUpdateEquipment()

  const handleUpdateEquipment = async (data: z.infer<typeof UpdateEquipmentValidation>) => {
    const obj = {
      id: Number(id),
      title: data.title,
      status: data.status,
    }

    console.log('data:', data)

    try {
      await useUpdateEquipmentMutation(obj)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <div className=''>
        <form onSubmit={form.handleSubmit(handleUpdateEquipment)} className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
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
              <FormItem className='flex flex-col gap-2'>
                <FormLabel className='font-semibold'>Состояние</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='shad-button_primary'>
            Сохранить изменения
          </Button>
        </form>
      </div>
    </Form>
  )
}

export { EditEquipmentForm }
