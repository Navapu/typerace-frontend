import './App.css'
import { Routes, Route } from "react-router";
import { Login } from './pages/Login.jsx';
import { LoginGoogle } from './pages/LoginGoogle.jsx';
import { Header } from './components/Header.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { TextStatsPage } from './pages/TextStatsPage.jsx';
import { PlayRandomPage } from './pages/PlayRandomPage.jsx';
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

        <Route path='/auth/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }/>

        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }/>
        <Route path="/texts/:textId/stats" element={<TextStatsPage />} />
        <Route path='/play/random' element={<PlayRandomPage />}/>
      </Routes>
    </div>
  )
}

export default App
