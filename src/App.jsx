import './App.css'
import { Navigate, BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Payments from './pages/Payments'
import Reservations from './pages/Reservations'
import Fields from './pages/Fields'
import CreateReservationWithPayment from './pages/CreateReservationWithPayment '

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login'></Navigate>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/payments' element={<Payments/>}/>
          <Route path='/reservations' element={<Reservations/>}/>
          <Route path='/fields' element={<Fields/>}/>
          <Route path='/create/payment' element={<CreateReservationWithPayment/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App