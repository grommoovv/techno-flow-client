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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

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
  start_time: z.string(),
  end_time: z.string(),
  user_id: z.number(),
  equipment_id: z.number().or(z.array(z.number())),
})

const AddEventForm: FC = () => {
  const form = useForm<z.infer<typeof AddEventValidation>>({
    resolver: zodResolver(AddEventValidation),
    defaultValues: {
      user_id: 1,
      equipment_id: 1,
    },
  })

  const handleAddEvent = async (data: z.infer<typeof AddEventValidation>) => {
    console.log('click')

    console.log(data)
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
                  <FormLabel>Вид деятельности</FormLabel>
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
                  <FormLabel>Дата мероприятия</FormLabel>
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
                        disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
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
                name='start_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Начало</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <div>:</div>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='end_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Конец</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <div>:</div>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='shad-button_primary'>
              Создать
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export { AddEventForm }
