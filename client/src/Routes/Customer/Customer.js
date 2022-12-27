import React  from "react";
import { Routes, Route } from "react-router-dom";
import CustomersHome from "./CustomersHome";
import Cartspage from "./Cartspage";
import GlobalState from "../../cartContext/GlobalState";
import Checkout from "./Checkout";
import CustomersLandingpage from "./CustomersLandingpage";
import CustomerSnacks from "./CustomerSnacks";
import './Customer.css'

const Customer = () => {
  return (
      <GlobalState>
        <Routes>
            <Route path='/' element={<CustomersLandingpage/>}/>
            <Route path='/customerhome' element={<CustomersHome/>}/>
            <Route path='/customersnacks' element={<CustomerSnacks/>}/>
            <Route path='/cartspage' element={<Cartspage/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </GlobalState>
  )
}

export default Customer