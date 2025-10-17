import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../utils/axiosWithAuth';
import './TemplateList.css';

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await $api.get('/templates');
        setTemplates(response.data);
      } catch {
        setError('Не удалось загрузить шаблоны');
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const createHabit = async (templateId) => {
    try {
      await $api.post(`/templates/${templateId}/habits`);
      // alert('Привычка создана!');
      navigate('/home');
    } catch {
      setError('Ошибка создания привычки');
    }
  };

  const allCategoryNames = templates.map(template =>
    template.categories?.map(category => category.name) || []
  ).flat();

  const uniqueCategories = [...new Set(allCategoryNames)];

  const categories = ['all', ...uniqueCategories];

  let filteredTemplates = templates;
  if (selectedCategory !== 'all') {
    filteredTemplates = templates.filter(template =>
      template.categories?.some(category => category.name === selectedCategory)
    );
  }

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="template-list">
      {error && <div className="error">{error}</div>}

      <div className="filter">
        <label>Категория: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Все категории' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="templates">
        {filteredTemplates.map(template => (
          <div key={template.id} className="template-card">
            <h3>{template.title}</h3>
            <p>{template.description}</p>

            <div className="info">
              <span>{template.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно'}</span>
              {/* <span>👍 {template.popularity}</span> */}
            </div>

            <div className="categories">
              {/* ИСПРАВЛЕНО: заменил кириллическую "с" на латинскую */}
              {template.categories?.map(category => (
                <span key={category.id} className="tag">{category.name}</span>
              ))}
            </div>

            <button onClick={() => createHabit(template.id)}>
              Создать привычку
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateList;