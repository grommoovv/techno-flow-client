import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layouts/RootLayout'
import { Home } from './pages/Home'
import { Events } from './pages/Events'
import { Equipment } from './pages/Equipment'
import { Users } from './pages/Users'
import { SignIn } from './pages/SignIn'
import { DetailedEquipment } from './pages/detailed/DetailedEquipment'
import { AuthLayout } from './components/layouts/AuthLayout'
import { Me } from './pages/Me'
import { Maintenance } from './pages/Maintenance'
import { DetailedEvent } from './pages/detailed/DetailedEvent'

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/sign-in' element={<SignIn />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path='/me' element={<Me />} />

        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<DetailedEvent />} />

        <Route path='/equipment' element={<Equipment />} />
        <Route path='/equipment/:id' element={<DetailedEquipment />} />

        <Route path='/users' element={<Users />} />

        <Route path='/maintenance' element={<Maintenance />} />

        <Route path='*' element={<div>Not Found</div>} />
      </Route>
    </Routes>
  )
}

export { Router }
