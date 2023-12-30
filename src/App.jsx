import { useState ,useEffect} from 'react'
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer' 
import { Header,Footer, Container } from './components/index'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentuser()
  //   .then((userData)=>{
  //        if (userData) {
  //         dispatch(login({userData}))
  //        }
  //        else{
  //         dispatch(logout())
  //        }
  //   }).catch((error)=>{
  //     console.log("user cannot be fectched");
  //   })
  //   .finally(()=>{
  //     setLoading(false)
  //   })
  
    
  // }, [])
  

  return (
 <div className='flex min-h-screen flex-wrap content-between bg-gray-400'>
 <div className='w-full block'>
 
   <Header/>
   
   <Footer/>
 </div>
 </div>
  )
}

export default App
