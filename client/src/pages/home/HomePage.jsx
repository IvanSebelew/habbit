import React from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../utils/axiosWithAuth';
import HabitList from '../../components/HabitList';
import './HomePage.css';

export function HomePage() {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await $api.post('/auth/logout'); 
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      alert('Произошла ошибка при выходе');
    }
  };

  const handleTemplates = () => {
    navigate('/templates');
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Трекер привычек</h1>
        <div className="user-actions">
          <button onClick={handleTemplates} className="templates-button">
            📚 Шаблоны привычек
          </button>
          <button onClick={handleLogout} className="logout-button">Выйти</button>
        </div>
      </header>
      
     
      <HabitList />
    </div>
  );
}