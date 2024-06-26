import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './components/Header'
import PrivateRouter from './components/PrivateRouter'
import CreateList from './pages/CreateList'
import  UpdateList  from './pages/UpdateList'
import Listing from './pages/Listing'
import Search from './pages/Search'


const App = () => {
  return (
    
    <BrowserRouter>
    <Header/> 
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/listing/:listingId' element={<Listing/>}/>
      <Route path='/search' element={<Search/>}/>
      
      <Route element={<PrivateRouter/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/createlist' element={<CreateList/>}/>
        <Route path='/updatelist/:listingId' element={<UpdateList/>}/>     
      </Route>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App