import { FC } from 'react'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/shared/lib/utils'

import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useGetAvailabileEquipment, useGetEquipment } from '@/api/equipment/queries'
import { Checkbox } from '../ui/checkbox'
import { useCreateEvent } from '@/api/events/queries'
import { IEventCreateDto } from '@/api/events/service'
import { useAuth } from '@/context/auth'
import { Skeleton } from '../ui/skeleton'
import { Label } from '../ui/label'

const eventTypes = [
  {
    id: 1,
    type: 'Занятие для детей',
    value: 'Занятие для детей',
  },
  {
    id: 2,
    type: 'Занятие для взрослых',
    value: 'Занятие для взрослых',
  },
  {
    id: 3,
    type: 'Мастер-класс',
    value: 'Мастер-класс',
  },
  {
    id: 4,
    type: 'Услуга стороннему предприятию',
    value: 'Услуга стороннему предприятию',
  },
]

const AddEventValidation = z.object({
  title: z.string(),
  type: z.string(),
  date: z.date(),
  start_hours: z.string().regex(/^([01]\d|2[0-3])$/, { message: 'Invalid hours' }),
  start_minutes: z.string().regex(/^[0-5]\d$/, { message: 'Invalid minutes' }),
  end_hours: z.string().regex(/^([01]\d|2[0-3])$/, { message: 'Invalid hours' }),
  end_minutes: z.string().regex(/^[0-5]\d$/, { message: 'Invalid minutes' }),
  user_id: z.number(),
  equipment_id: z.array(z.number()).default([]),
})

const AddEventForm: FC = () => {
  const { user } = useAuth()

  const form = useForm<z.infer<typeof AddEventValidation>>({
    resolver: zodResolver(AddEventValidation),
    defaultValues: {
      user_id: user?.id,
      equipment_id: [],
    },
  })

  const { data: equipment, isLoading, error: equipmentError } = useGetAvailabileEquipment()
  const { mutateAsync: createEventMutation, isPending, error: eventError } = useCreateEvent()

  const handleAddEvent = async (value: z.infer<typeof AddEventValidation>) => {
    const { date, start_hours, start_minutes, end_hours, end_minutes } = value

    const start_time = new Date(date)
    start_time.setHours(Number(start_hours))
    start_time.setMinutes(Number(start_minutes))

    const end_time = new Date(date)
    end_time.setHours(Number(end_hours))
    end_time.setMinutes(Number(end_minutes))

    const obj: IEventCreateDto = {
      title: value.title,
      type: value.type,
      start_date: start_time,
      end_date: end_time,
      user_id: value.user_id,
      equipment_id: value.equipment_id,
    }

    console.log(obj)
    await createEventMutation(obj)
    // form.reset()
  }

  return (
    <>
      <Form {...form}>
        <div className='flex flex-center flex-col min-w-96 mt-5'>
          <form
            onSubmit={form.handleSubmit(handleAddEvent)}
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
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Вид деятельности</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
                        <SelectValue placeholder='Выберите вид деятельности' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypes.map((t) => (
                        <SelectItem value={t.value} key={t.id}>
                          {t.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='font-semibold'>Дата мероприятия</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Выберите дату</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0 ' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date() || date <= new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-10'>
              <FormField
                control={form.control}
                name='start_hours'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Часы начала</FormLabel>
                    <FormControl>
                      <Input className='max-w-16' maxLength={2} {...field} max={23} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='start_minutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Минуты начала</FormLabel>
                    <FormControl>
                      <Input className='max-w-16' maxLength={2} {...field} max={59} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-10'>
              <FormField
                control={form.control}
                name='end_hours'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Часы конца</FormLabel>
                    <FormControl>
                      <Input className='max-w-16' maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='end_minutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Минуты конца</FormLabel>
                    <FormControl>
                      <Input className='max-w-16' maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label className='font-semibold'>Доступное оборудование</Label>
              {isLoading && (
                <ul className='flex flex-wrap gap-2'>
                  {Array.from({ length: 8 }, (_, index) => (
                    <li>
                      <Skeleton className='h-8 w-20' key={index} />
                    </li>
                  ))}
                </ul>
              )}

              {equipmentError && <div>Нет свободного оборудования</div>}

              {equipment && (
                <ul className='flex gap-2 mt-2 flex-wrap'>
                  {equipment?.map((item) => (
                    <li className='border p-2 rounded-lg w-max' key={item.id}>
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='equipment_id'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex flex-row items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== item.id)
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-sm font-normal'>{item.title}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button type='submit' className='shad-button_primary'>
              Добавить
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export { AddEventForm }
