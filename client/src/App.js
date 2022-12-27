import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import './styles/Styles.css'
import ProtectedRoute from "./utils/ProtectedRoutes";
import AuthService from "./services/auth.service";
import Spinner from './components/Spinner';
const Main = lazy(()=> import('./Routes/Main'))
const Profile = lazy(()=> import('./Routes/Profile'))
const NotFound = lazy(()=> import('./Routes/NotFound'))
const Terms = lazy(()=> import('./Routes/Terms'))
const Home = lazy(()=> import('./Routes/Home'))
const Customer = lazy(()=> import('./Routes/Customer/Customer'))
const Register = lazy(()=> import('./Routes/Register'))
const Login = lazy(()=> import('./Routes/Login'))
const Farmer = lazy(()=> import('./Routes/Farmer/Farmer'))
const Admin = lazy(()=> import('./Routes/Admin/Admin'))
const user = AuthService.getCurrentUser();
const Forgot = lazy(()=> import("./Routes/Forgot"))
const NewPassword = lazy (()=> import("./Routes/NewPassword"))
const ResetPasswordSuccessful = lazy(()=> import("./Routes/ResetPasswordSuccessful"))
const RegisterSucces = lazy(()=>import("./Routes/RegisterSucces"))

const App = () => {
  return (
    <>
    <Suspense fallback={<Spinner/>}>
    <Routes>
      <Route path='/' element={<Main/>}>
          <Route index element={<Home/>}/>
        
          <Route 
            path="customers/*" 
            element={
            <ProtectedRoute isAllowed={!!user && user.role === "customer"}>
              <Customer/>
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path='/farmers/*'
            element={
            <ProtectedRoute isAllowed={!!user && user.role === "farmer"}>
              <Farmer/>
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path="admin/*" 
            element={
            <ProtectedRoute isAllowed={!!user && user.role === "admin"}>
              <Admin/>
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path="profile" 
            element={
            <ProtectedRoute isAllowed={!!user}>
              <Profile/>
              </ProtectedRoute>
            }>
          </Route>

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/registeration-successfull' element={<RegisterSucces/>}/>
          <Route path='/Forgot' element={<Forgot/>}/>
          <Route path='/newpassword' element={<NewPassword/>}/>
          <Route path='/ResetPasswordSuccessful' element={<ResetPasswordSuccessful/>}/>
          <Route path='/terms' element={<Terms/>}/>
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </Suspense>
    </>
  );
};

export default App;
