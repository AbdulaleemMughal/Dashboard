import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from '../Pages/DashBoard'
import Inventory from '../Pages/Inventory'
import Order from '../Pages/Order'
import Customer from '../Pages/Customer'

const AppRouter = ({locale}) => {
  return (
    
        <Routes>
            <Route path='/' element={<DashBoard locale={locale} />}></Route>
            <Route path='/inventory' element={<Inventory locale={locale} />}></Route>
            <Route path='/orders' element={<Order locale={locale} />}></Route>
            <Route path='/customer' element={<Customer locale={locale} />}></Route>
        </Routes>
  )
}

export default AppRouter
