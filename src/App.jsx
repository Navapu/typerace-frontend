import './App.css'
import { Routes, Route } from "react-router";
import { Login } from './pages/Login.jsx';
import { LoginGoogle } from './pages/LoginGoogle.jsx';
import { Header } from './components/Header.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/auth/login' element={<Login />}/>
        <Route path='/auth/login-success' element={<LoginGoogle />}/>
      </Routes>

      <Header />
    </div>
  )
}

export default App
