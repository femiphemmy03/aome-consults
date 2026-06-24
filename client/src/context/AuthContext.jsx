import { createContext, useContext, useState } from 'react';
import api from '../utils/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('aome_admin_token'));
  const [username, setUsername] = useState(localStorage.getItem('aome_admin_username'));

  async function login(usernameInput, password) {
    const { data } = await api.post('/api/admin/login', { username: usernameInput, password });
    localStorage.setItem('aome_admin_token', data.token);
    localStorage.setItem('aome_admin_username', data.username);
    setToken(data.token);
    setUsername(data.username);
    return data;
  }

  function logout() {
    localStorage.removeItem('aome_admin_token');
    localStorage.removeItem('aome_admin_username');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
