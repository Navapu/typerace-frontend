import './App.css'
import { Routes, Route, NavLink } from "react-router";
import { Login } from './pages/Login.jsx';
import { Header } from './components/Header.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/auth/Login' element={<Login />}/>
      </Routes>

      <Header />
    </div>
  )
}

export default App
