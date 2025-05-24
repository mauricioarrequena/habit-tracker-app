import './index.css'
import App from './App.tsx'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Canvas from './pages/Canvas.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='login' element={<div>login page</div>}></Route>
        <Route path='register' element={<div>register page</div>}></Route>
        <Route path='*' element={<div>not found</div>}></Route>
        <Route element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path='canvas' element={<Canvas/>} />
          <Route path='about' element={<div>about page</div>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
