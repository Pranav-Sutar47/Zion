import { useState } from 'react'
import AdminDashboard from './components/ui/AdminDashboard'
import LoginPage from './components/ui/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Navigate to={'/home'}/>}/> */}
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/dashboard' element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
  )
}
export default App;
