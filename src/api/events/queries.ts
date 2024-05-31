import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { Event, IEventCreateDto } from './service'
import { toast } from 'sonner'

export const useGetEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVENTS],
    queryFn: () => Event.getAll(),
  })
}

export const useGetEventsByUserId = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVENTS_BY_USER_ID, id],
    queryFn: () => Event.getByUserId(id),
  })
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IEventCreateDto) => Event.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_EVENTS] })
      toast.success('Мероприятие создано')
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })
}
