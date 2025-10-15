import React, { useState, useEffect } from 'react';
import $api from '../utils/axiosWithAuth';
import './HabitList.css';

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ 
    title: '', 
    frequency: 'daily'
  });
  const [editingHabit, setEditingHabit] = useState({ 
    id: null, 
    title: '', 
    frequency: 'daily' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Загрузка привычек
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await $api.get('/habits');
      setHabits(response.data);
      setError('');
    } catch (error) {
      console.error('Ошибка загрузки привычек:', error);
      setError('Не удалось загрузить привычки');
    } finally {
      setLoading(false);
    }
  };

  // Добавление привычки
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newHabit.title.trim()) return;
    
    try {
      const response = await $api.post('/habits', {
        title: newHabit.title.trim(),
        frequency: newHabit.frequency
      });
      setHabits([...habits, response.data]);
      setNewHabit({ title: '', frequency: 'daily' });
      setError('');
    } catch (error) {
      console.error('Ошибка создания привычки:', error);
      setError('Не удалось создать привычку');
    }
  };

  // Редактирование привычки
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editingHabit.title.trim()) return;
    
    try {
      const response = await $api.put(`/habits/${editingHabit.id}`, {
        title: editingHabit.title.trim(),
        frequency: editingHabit.frequency
      });
      setHabits(habits.map(habit => 
        habit.id === editingHabit.id ? response.data : habit
      ));
      setEditingHabit({ id: null, title: '', frequency: 'daily' });
      setError('');
    } catch (error) {
      console.error('Ошибка обновления привычки:', error);
      setError('Не удалось обновить привычку');
    }
  };

  // Удаление привычки
  const handleDelete = async (habitId) => {
    if (!window.confirm('Удалить эту привычку?')) return;
    
    try {
      await $api.delete(`/habits/${habitId}`);
      setHabits(habits.filter(habit => habit.id !== habitId));
      setError('');
    } catch (error) {
      console.error('Ошибка удаления привычки:', error);
      setError('Не удалось удалить привычку');
    }
  };

  // Переключение статуса выполнения
  const handleToggle = async (habitId) => {
    try {
      const response = await $api.patch(`/habits/${habitId}/toggle`);
      setHabits(habits.map(habit => 
        habit.id === habitId ? response.data : habit
      ));
      setError('');
    } catch (error) {
      console.error('Ошибка переключения статуса:', error);
      setError('Не удалось обновить статус');
    }
  };

  // Запуск редактирования
  const startEditing = (habit) => {
    setEditingHabit({ 
      id: habit.id, 
      title: habit.title, 
      frequency: habit.frequency 
    });
  };

  // Обработчик изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingHabit.id) {
      setEditingHabit({ ...editingHabit, [name]: value });
    } else {
      setNewHabit({ ...newHabit, [name]: value });
    }
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingHabit({ id: null, title: '', frequency: 'daily' });
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="habit-list">
      <h2>Мои привычки</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAdd} className="habit-form">
        <input
          type="text"
          name="title"
          placeholder="Название привычки"
          value={newHabit.title}
          onChange={handleChange}
          required
          maxLength={255}
        />
        <select
          name="frequency"
          value={newHabit.frequency}
          onChange={handleChange}
        >
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
        </select>
        <button type="submit" className="btn-primary">Добавить</button>
      </form>

      {editingHabit.id && (
        <form onSubmit={handleEdit} className="habit-form editing">
          <h3>Редактирование привычки</h3>
          <input
            type="text"
            name="title"
            placeholder="Название привычки"
            value={editingHabit.title}
            onChange={handleChange}
            required
            maxLength={255}
          />
          <select
            name="frequency"
            value={editingHabit.frequency}
            onChange={handleChange}
          >
            <option value="daily">Ежедневно</option>
            <option value="weekly">Еженедельно</option>
          </select>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Сохранить</button>
            <button type="button" onClick={cancelEditing} className="btn-secondary">
              Отмена
            </button>
          </div>
        </form>
      )}
    
      <div className="habits-container">
        {habits.length === 0 ? (
          <p className="no-habits">У вас пока нет привычек. Добавьте первую!</p>
        ) : (
          <ul className="habits-list">
            {habits.map((habit) => (
              <li key={habit.id} className={`habit-item ${habit.completed ? 'completed' : ''}`}>
                <div className="habit-info">
                  <span className="habit-title">{habit.title}</span>
                  <span className="habit-meta">
                    {habit.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно'}
                    {habit.owner && <span className="habit-owner"> • {habit.owner}</span>}
                  </span>
                </div>
                
                <div className="habit-actions">
                  <button 
                    onClick={() => handleToggle(habit.id)} 
                    className={`toggle-btn ${habit.completed ? 'completed' : ''}`}
                  >
                    {habit.completed ? '✅' : '⚪'}
                  </button>
                  
                  {!habit.completed && (
                    <button 
                      onClick={() => startEditing(habit)}
                      className="btn-edit"
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleDelete(habit.id)}
                    className="btn-delete"
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HabitList;