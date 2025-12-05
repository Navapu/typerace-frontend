import './App.css'
import { Routes, Route } from "react-router";
import { Login } from './pages/Login.jsx';
import { LoginGoogle } from './pages/LoginGoogle.jsx';
import { Header } from './components/Header.jsx';
import PublicRoute from './components/PublicRoute.jsx';
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/auth/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }/>

        <Route path='/auth/login-success' element={
          <PublicRoute>
            <LoginGoogle />
          </PublicRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
