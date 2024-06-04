import { useQuery } from '@tanstack/react-query'
import { Maintenance } from '../services/maintenance'
import { QUERY_KEYS } from '../constants'

export const useGetMaintenance = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MAINTENANCE],
    queryFn: () => Maintenance.GetAll(),
  })
}

export const useGetMaintenanceById = (id: number) => {
	return useQuery({
    queryKey: [QUERY_KEYS.GET_MAINTENANCE, id],
    queryFn: () => Maintenance.GetById(id),
  })
}
