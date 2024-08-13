import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from '../Pages/DashBoard'
import Inventory from '../Pages/Inventory'
import Order from '../Pages/Order'
import Customer from '../Pages/Customer'

const AppRouter = () => {
  return (
    
        <Routes>
            <Route path='/' element={<DashBoard />}></Route>
            <Route path='/inventory' element={<Inventory />}></Route>
            <Route path='/orders' element={<Order />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
        </Routes>
  )
}

export default AppRouter
