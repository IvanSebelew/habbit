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

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await $api.get('/habits');
      setHabits(response.data);
    } catch {
      setError('Не удалось загрузить привычки');
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (newHabit.title.trim() === '') return;
    
    try {
      const response = await $api.post('/habits', {
        title: newHabit.title.trim(),
        frequency: newHabit.frequency
      });
      setHabits([...habits, response.data]);
      setNewHabit({ title: '', frequency: 'daily' });
      setError('');
    } catch {
      setError('Не удалось создать привычку');
    }
  };

   const handleUpdateHabit = async (e) => {
    e.preventDefault();
    if (editingHabit.title.trim() === '') return;
    
    try {
      const response = await $api.put(`/habits/${editingHabit.id}`, {
        title: editingHabit.title.trim(),
        frequency: editingHabit.frequency
      });
      
      const updatedHabits = habits.map(habit => {
        if (habit.id === editingHabit.id) {
          return response.data;
        }
        return habit;
      });
      
      setHabits(updatedHabits);
      setEditingHabit({ id: null, title: '', frequency: 'daily' });
      setError('');
    } catch {
      setError('Не удалось обновить привычку');
    }
  };

  const handleDeleteHabit = async (habitId) => {
      
    try {
      await $api.delete(`/habits/${habitId}`);
      const updatedHabits = habits.filter(habit => {
        return habit.id !== habitId;
      });
      setHabits(updatedHabits);
      setError('');
    } catch {
      setError('Не удалось удалить привычку');
    }
  };

   const handleToggleHabit = async (habitId) => {
    try {
      const response = await $api.patch(`/habits/${habitId}/toggle`);
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId) {
          return response.data;
        }
        return habit;
      });
      setHabits(updatedHabits);
      setError('');
    } catch {
      setError('Не удалось обновить статус');
    }
  };

  const startEditing = (habit) => {
    setEditingHabit({ 
      id: habit.id, 
      title: habit.title, 
      frequency: habit.frequency 
    });
  };

   const cancelEditing = () => {
    setEditingHabit({ id: null, title: '', frequency: 'daily' });
  };

   const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (editingHabit.id) {
      setEditingHabit({
        ...editingHabit,
        [name]: value
      });
    } else {
      setNewHabit({
        ...newHabit,
        [name]: value
      });
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="habit-list">
      <h2>Мои привычки</h2>

      {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleAddHabit} className="habit-form">
        <input
          type="text"
          name="title"
          placeholder="Название привычки"
          value={newHabit.title}
          onChange={handleInputChange}
          required
          maxLength={255}
        />
        <select
          name="frequency"
          value={newHabit.frequency}
          onChange={handleInputChange}
        >
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
        </select>
        <button type="submit" className="btn-primary">Добавить</button>
      </form>

            {editingHabit.id && (
        <form onSubmit={handleUpdateHabit} className="habit-form editing">
          <h3>Редактирование привычки</h3>
          <input
            type="text"
            name="title"
            placeholder="Название привычки"
            value={editingHabit.title}
            onChange={handleInputChange}
            required
            maxLength={255}
          />
          <select
            name="frequency"
            value={editingHabit.frequency}
            onChange={handleInputChange}
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
            {habits.map((habit) => {
              const itemClass = habit.completed ? 'habit-item completed' : 'habit-item';
              const frequencyText = habit.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно';
              const toggleIcon = habit.completed ? '✅' : '⚪';
              const canEdit = !habit.completed;

              return (
                <li key={habit.id} className={itemClass}>
                  <div className="habit-info">
                    <span className="habit-title">{habit.title}</span>
                    <span className="habit-meta">
                      {frequencyText}
                      {habit.owner && <span className="habit-owner"> • {habit.owner}</span>}
                    </span>
                  </div>
                  
                  <div className="habit-actions">
                    <button 
                      onClick={() => handleToggleHabit(habit.id)} 
                      className={`toggle-btn ${habit.completed ? 'completed' : ''}`}
                    >
                      {toggleIcon}
                    </button>
                    
                    {canEdit && (
                      <button 
                        onClick={() => startEditing(habit)}
                        className="btn-edit"
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                    )}
                    
                    <button 
                      onClick={() => handleDeleteHabit(habit.id)}
                      className="btn-delete"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HabitList;