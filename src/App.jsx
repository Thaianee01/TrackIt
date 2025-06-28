import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/App.css';

import Login from "../pages/login";
import SignUp from '../pages/signup';
import Habits from "../pages/habits";
import AddToday from '../pages/today';

import AuthContext from './contexts/AuthContext';
import UserContext from './contexts/UserContext';
import HabitsContext from './contexts/HabitsContext';

import Layout from '../pages/footer';
import { setAuthToken } from './services/API';

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);

// Carrega o token e usuário no localStorage ao iniciar
useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken) {
    setToken(savedToken);       
    setAuthToken(savedToken);    
  }

  if (savedUser) {
    setUser(JSON.parse(savedUser));   // <-- Carrega o usuário pro contexto
  }
}, []);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        <HabitsContext.Provider value={{ habits, setHabits }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/cadastro' element={<SignUp />} />
              <Route path='/habitos' element={<Layout><Habits /></Layout>} />
              <Route path='/hoje' element={<Layout><AddToday /></Layout>} />
            </Routes>
          </BrowserRouter>
        </HabitsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
