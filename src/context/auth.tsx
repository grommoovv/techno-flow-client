import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const useAuthContext = () => useContext(AuthContext)

const AuthContextProvicer = () => {
  const [user, setUser] = useState()
  const [isUserAuth, setIsUserAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const checkIsUserAuth = async () => {}
}
