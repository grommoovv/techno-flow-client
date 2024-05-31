import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { Equipment } from './service'
import { toast } from 'sonner'

export const useGetEquipment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EQUIPMENT],
    queryFn: () => Equipment.getAll(),
  })
}

export const useGetAvailabileEquipment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AVAILABLE_EQUIPMENT],
    queryFn: () => Equipment.getAvailable(),
  })
}

export const useGetEquipmentById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EQUIPMENT_BY_ID, id],
    queryFn: () => Equipment.getById(id),
  })
}

export const useGetEquipmentUsageHistoryById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EQUIPMENT_USAGE_HISTORY_BY_ID, id],
    queryFn: () => Equipment.getUsageHistoryById(id),
  })
}

export const useCreateEquipment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { title: string; status: string }) => Equipment.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_EQUIPMENT] })
      toast.success('Новое оборудование добавлено')
    },
    onError: () => {
      toast.error('Ошибка при добавлении нового оборудования')
    },
  })
}

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: number; title: string; status: string }) => Equipment.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_EQUIPMENT_BY_ID] })
      toast.success('Информация изменена')
    },
  })
}
