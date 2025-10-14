import React, { useState, useEffect } from 'react';
import api from '../utils/axiosWithAuth';
import './HabitList.css';

const HabitList = ({username}) => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ 
    title: '', 
    frequency: 'daily' // По умолчанию "ежедневно"
  });
  const [editingHabit, setEditingHabit] = useState({ 
    id: null, 
    title: '', 
    frequency: 'daily' 
  });

  // Загрузка привычек
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get('/habits');
        setHabits(response.data);
      } catch (error) {
        console.error('Ошибка загрузки привычек:', error);
      }
    };
    fetchHabits();
  }, []);

  // Добавление привычки
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/habits', {
        title: newHabit.title,
        frequency: newHabit.frequency,
        completed: false
      });
      setHabits([...habits, response.data]);
      setNewHabit({ title: '', frequency: 'daily' }); // Сброс формы
    } catch (error) {
      console.error('Ошибка создания привычки:', error);
    }
  };

  // Редактирование привычки
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/habits/${editingHabit.id}`, {
        title: editingHabit.title,
        frequency: editingHabit.frequency
      });
      setHabits(habits.map(habit => 
        habit.id === editingHabit.id ? response.data : habit
      ));
      setEditingHabit({ id: null, title: '', frequency: 'daily' }); // Сброс редактирования
    } catch (error) {
      console.error('Ошибка обновления привычки:', error);
    }
  };

 
  const handleDelete = async (habitId) => {
    try {
      await api.delete(`/habits/${habitId}`);
      setHabits(habits.filter(habit => habit.id !== habitId));
    } catch (error) {
      console.error('Ошибка удаления привычки:', error);
    }
  };

 
  const handleComplete = async (habitId) => {
    try {
      const response = await api.put(`/habits/${habitId}`, { completed: true });
      setHabits(habits.map(habit => 
        habit.id === habitId ? response.data : habit
      ));
    } catch (error) {
      console.error('Ошибка отметки выполнения:', error);
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

  return (
    <div className="habit-list">
      <h1>Список привычек</h1>

      {/* Форма добавления */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Название привычки"
          value={newHabit.title}
          onChange={handleChange}
          required
        />
        <select
          name="frequency"
          value={newHabit.frequency}
          onChange={handleChange}
        >
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
        </select>
        <button type="submit">Добавить</button>
      </form>

      
      {editingHabit.id && (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            name="title"
            placeholder="Название"
            value={editingHabit.title}
            onChange={handleChange}
            required
          />
          <select
            name="frequency"
            value={editingHabit.frequency}
            onChange={handleChange}
          >
            <option value="daily">Ежедневно</option>
            <option value="weekly">Еженедельно</option>
          </select>
          <button type="submit">Сохранить</button>
          <button 
            type="button"
            onClick={() => setEditingHabit({ id: null, title: '', frequency: 'daily' })}
          >
            Отмена
          </button>
        </form>
      )}

      {/* Список привычек */}
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <span className={habit.completed ? 'completed' : ''}>
              {habit.title} ({habit.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно'})
               {habit.owner && <span className="habit-owner"> - {habit.owner}</span>}
               {username && habit.owner === username && <span className="your-habit"> (Ваша)</span>}
            </span>
            {!habit.completed && (
              <button onClick={() => startEditing(habit)}>✏️</button>
            )}
            <button 
              onClick={() => handleComplete(habit.id)} 
              disabled={habit.completed}
            >
              {habit.completed ? '✅ Выполнено' : 'Отметить выполненным'}
            </button>
            <button onClick={() => handleDelete(habit.id)}>🗑️ Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;