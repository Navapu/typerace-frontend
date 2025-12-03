import './App.css'
import { Routes, Route, NavLink } from "react-router";
import { Login } from './pages/Login.tsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/auth/Login' element={<Login />}/>
      </Routes>

      <NavLink to= "/auth/login">Login</NavLink>
    </div>
  )
}

export default App
