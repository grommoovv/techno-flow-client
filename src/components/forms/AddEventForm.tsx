import { FC, useState } from 'react'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/shared/lib/utils'

import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useGetAvailabileEquipment, useGetEquipment } from '@/api/equipment/queries'
import { Checkbox } from '../ui/checkbox'
import { useCreateEvent } from '@/api/events/queries'
import { IEventCreateDto } from '@/api/events/service'
import { useAuth } from '@/context/auth'
import { Skeleton } from '../ui/skeleton'
import { Label } from '../ui/label'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '../ui/scroll-area'
import { toast } from 'sonner'

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

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

type Checked = DropdownMenuCheckboxItemProps['checked']

const AddEventForm: FC = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  const { user } = useAuth()

  const form = useForm<z.infer<typeof AddEventValidation>>({
    resolver: zodResolver(AddEventValidation),
    defaultValues: {
      user_id: user?.id,
      equipment_id: [],
    },
  })

  // const { data: equipment, isLoading, error: equipmentError } = useGetAvailabileEquipment()
  const {
    data: equipment,
    mutateAsync: getAvailableEquipmentMutate,
    isPending: isEquipmentPending,
    error: equipmentError,
  } = useGetAvailabileEquipment()

  const {
    mutateAsync: createEventMutation,
    isPending: isEventPending,
    error: eventError,
  } = useCreateEvent()

  const checkAvailableEquipment = async () => {
    const { date, start_hours, start_minutes, end_hours, end_minutes } = form.getValues()

    console.log(form.getValues())

    if (
      date == undefined ||
      start_hours == undefined ||
      start_minutes == undefined ||
      end_hours == undefined ||
      end_minutes == undefined
    ) {
      toast.error('Необходимо заполнить время начала и конца мероприятия')
      return
    }

    const start_date = new Date(date)
    start_date.setHours(Number(start_hours))
    start_date.setMinutes(Number(start_minutes))

    const end_date = new Date(date)
    end_date.setHours(Number(end_hours))
    end_date.setMinutes(Number(end_minutes))

    const obj = {
      start_date,
      end_date,
    }

    try {
      await getAvailableEquipmentMutate(obj)
    } catch (error) {
      throw new Error(error)
    }
  }

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

              <DropdownMenu>
                <DropdownMenuTrigger className='w-52' asChild>
                  <Button variant='outline'>Выбрать оборудование</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-60'>
                  <DropdownMenuLabel className='flex justify-between'>
                    Оборудование
                    <div className='cursor-pointer' onClick={checkAvailableEquipment}>
                      Поиск
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <ScrollArea className='max-h-[200px] w-48 rounded-md'>
                    <ul className='flex flex-col gap-2 p-[10px]'>
                      {equipment?.map((item) => (
                        <li className='rounded-lg max-w border-b pb-2 px-2' key={item.id}>
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
                                  <FormLabel className='text-sm font-normal'>
                                    {item.title}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        </li>
                      ))}
                      {isEquipmentPending && <div className='text-sm font-medium'>Загрузка...</div>}
                      {equipmentError && <div className='text-sm font-medium'>Тут пусто...</div>}
                    </ul>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
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
