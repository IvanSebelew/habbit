import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './registerPage.css';
import $api from '../../utils/axiosWithAuth';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      setMessage('Все поля обязательны для заполнения');
      return;
    }

    if (password.length < 1) {
      setMessage('Пароль должен содержать минимум 1 символов');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const res = await $api.post(
        '/auth/register',
        { username, email, password },
        
      );

      if (res.status >= 200 && res.status < 300) {
        setMessage('Регистрация успешна! Перенаправляем на вход...');
        setAccessToken(response.data.accessToken);
        
        console.log('✅ Регистрация успешна, токен сохранен:', {
          accessToken: response.data.accessToken ? 'есть' : 'нет',
          username: response.data.username,
          role: response.data.role
        });
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 409) {
        setMessage('Пользователь с таким именем или email уже существует');
      } else {
        setMessage('Ошибка сервера. Пожалуйста, попробуйте позже');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Создать аккаунт</h2>

        <form onSubmit={handleSubmit} className="register-form">

          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Придумайте уникальное имя"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Не менее 1 символов"
              minLength={1}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>


        {message && (
          <div className={`message ${message.includes('успешна') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="login-link">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </div>
      </div>
    </div>
  );
}