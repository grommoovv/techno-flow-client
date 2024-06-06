import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Report } from '../services/reports'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants'

export const useGetReportsByUserId = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REPORTS_BY_USER_ID, id],
    queryFn: () => Report.getByUserId(id),
  })
}

export const useGetReports = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REPORTS],
    queryFn: () => Report.getAll(),
  })
}

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
