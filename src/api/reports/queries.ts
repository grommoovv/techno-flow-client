import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Report } from './service'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants'

export const useCreateReport = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { message: string; user_id: number; equipment_id: number }) =>
      Report.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_EQUIPMENT_BY_ID] })
      toast.success('Обращение создано')
    },
    onError: (е) => {
      toast.error(е.message)
    },
  })
}
