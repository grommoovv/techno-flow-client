import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { Equipment } from '../services/equipment'
import { toast } from 'sonner'

export const useGetEquipment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EQUIPMENT],
    queryFn: () => Equipment.getAll(),
  })
}

export const useGetAvailabileEquipment = () => {
  return useMutation({
    mutationFn: (data: { start_date: Date; end_date: Date }) => Equipment.getAvailableByDate(data),
  })
}

export const useGetEquipmentById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EQUIPMENT_BY_ID, id],
    queryFn: () => Equipment.getById(id),
  })
}

export const useGetEquipmentByEventId = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EQUIPMENT_BY_EVENT_ID, id],
    queryFn: () => Equipment.getByEventId(id),
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
