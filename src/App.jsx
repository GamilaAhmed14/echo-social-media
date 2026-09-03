import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Profile from './components/Profile/Profile'
import { ContainerContextProvider } from './Context/ContainerContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './components/PostDetails/PostDetails'
import { ToastContainer } from 'react-toastify';
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm'
import { useNetworkState } from 'react-use'




function App() {
  
let {online}=useNetworkState()
let queryClient = new  QueryClient();
  
let route = createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {path:"home",element:<ProtectedRoute><Home/></ProtectedRoute>},
     {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"home/postdetails/:id",element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
    {path:"profile", element:<ProtectedRoute><Profile/></ProtectedRoute>},
     {path:"resetpassword", element:<ProtectedRoute><ResetPasswordForm/></ProtectedRoute>},
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"logout", element:<Register/>},
    {path:"*",element:<NotFound/>},
  ]}
])
  return (
    <>
    {!online?  <div><p>Error</p></div>: <QueryClientProvider client={queryClient} >
    <ToastContainer />
  <ReactQueryDevtools/>
     <ContainerContextProvider>
    <RouterProvider  router={route}></RouterProvider>
   </ContainerContextProvider>
  </QueryClientProvider>}
    
 
    </>
  )
}

export default App
