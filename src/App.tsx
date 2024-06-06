import '@/shared/styles/globals.scss'
import { Router } from './router'
import { useEffect } from 'react'
import { useAuth } from './context/auth'
import { Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const App = () => {
  return (
    <>
      <Router />
      <Toaster richColors />
    </>
  )
}
