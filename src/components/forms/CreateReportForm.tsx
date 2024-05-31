import { FC } from 'react'
// import cls from './CreateReportForm.module.scss'
import { useUpdateEquipment } from '@/api/equipment/queries'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { useAuth } from '@/context/auth'
import { useCreateReport } from '@/api/reports/queries'

const CreateReportValidation = z.object({
  message: z.string(),
})

interface CreateReportFormProps {
  equipment: {
    id: number
    title: string
  }
}

const CreateReportForm: FC<CreateReportFormProps> = ({ equipment }) => {
  const form = useForm<z.infer<typeof CreateReportValidation>>({
    resolver: zodResolver(CreateReportValidation),
  })

  const { equipmentId } = useParams()

  console.log('equipmentId:', equipment.id)

  const { user } = useAuth()
  const { mutateAsync: createReportMutation } = useCreateReport()

  const handleCreateReport = async (data: z.infer<typeof CreateReportValidation>) => {
    const obj = {
      message: data.message,
      user_id: user?.id,
      equipment_id: Number(equipment.id),
    }

    try {
      await createReportMutation(obj)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Label>Оборудование: {equipment.title}</Label>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>От: {user?.username}</Label>
        </div>
      </div>
      <Form {...form}>
        <div className=''>
          <form onSubmit={form.handleSubmit(handleCreateReport)} className='flex flex-col gap-6'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Сообщение</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-max ml-auto' type='submit'>
              Создать
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export { CreateReportForm }
