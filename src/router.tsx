import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layouts/RootLayout'
import { Home } from './pages/Home'
import { Events } from './pages/Events'
import { Equipments } from './pages/Equipments'
import { Users } from './pages/Users'

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/equipments' element={<Equipments />} />
        <Route path='/users' element={<Users />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Route>
    </Routes>
  )
}

export { Router }
