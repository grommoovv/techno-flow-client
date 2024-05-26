import { useMutation } from '@tanstack/react-query'
import { SignInAccountDto, signInAccount } from './users/service'

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (credentials: SignInAccountDto) => signInAccount(credentials),
  })
}
