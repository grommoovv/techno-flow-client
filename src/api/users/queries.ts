import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { User } from './service'
import { toast } from 'sonner'

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => User.getAll(),
  })
}

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
    queryFn: () => User.getById(id),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: { username: string; password: string }) => User.create(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] })
      toast.success('Пользователь создан')
    },
    onError: () => {
      toast.error('Ошибка при создании пользователя')
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] })
    },
  })
}
