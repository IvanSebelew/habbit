import React from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateList from '../../components/TemplateList'; // компонент шаблонов
import './TemplatesPage.css';

export function TemplatesPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="templates-page">
      <header className="header">
        <button onClick={handleBack} className="back-button">← Назад</button>
        <h1>Галерея шаблонов</h1>
        <div className="header-spacer"></div>
      </header>
      
      {/* Здесь рендерится функционал шаблонов */}
      <TemplateList />
    </div>
  );
}