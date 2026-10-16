import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import TodoPage from './components/TodoPage.jsx';

const SESSION_KEY = 'daylist-session';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(SESSION_KEY) === 'true');

  useEffect(() => {
    document.title = isLoggedIn ? 'Your todos — Daylist' : 'Sign in — Daylist';
  }, [isLoggedIn]);

  function handleLogin() {
    localStorage.setItem(SESSION_KEY, 'true');
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
  }

  return isLoggedIn ? <TodoPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />;
}
