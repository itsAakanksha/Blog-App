import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Allposts from './pages/Allposts.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import { AuthLayout } from './components/index.js'
// import AddPost from './pages/AddPost'
import {PostForm} from './components/index.js'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>
    <Route path='/' element = {<Home/>}/>
    <Route path='/login' element= {<AuthLayout authentication={false}><Signin/></AuthLayout>}/>
    <Route path='/signup' element = {<AuthLayout authentication={false}><Signup/></AuthLayout>}/>
    <Route path='/all-posts' element = {<AuthLayout authentication><Allposts/></AuthLayout>}/>
    <Route path='/add-post' element = {<AuthLayout authentication><PostForm/></AuthLayout>}/>
    <Route path='/edit-post/:slug' element = {<AuthLayout authentication><EditPost/></AuthLayout>}/>
    <Route path='/post/:slug' element ={<AuthLayout authentication><Post/></AuthLayout>}/>
   
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={route}/>
  </Provider>
  </React.StrictMode>,
)
