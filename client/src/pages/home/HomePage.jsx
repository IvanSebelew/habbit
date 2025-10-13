
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HabitList from '../../components/HabitList';
import './HomePage.css';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export function HomePage() {
  const navigate = useNavigate();
  const username = getCookie('username');
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, {
        withCredentials: true
      });

      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      alert('Произошла ошибка при выходе');
    }
  };




  return (

    <div className="home-page">
      <header className="header">
        <h1>Трекер привычек</h1>
        <div className="user-info">
          {username && <span>Привет, {username}!</span>}
          <button onClick={handleLogout} className="logout-button">Выйти</button>
        </div>
      </header>
      <HabitList username={username} />
    </div>
  );
}