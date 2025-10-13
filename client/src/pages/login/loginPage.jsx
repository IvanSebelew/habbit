import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';

export function LoginPage() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        { username, password }, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        }
      );

      if (response.status === 200) {
        
        navigate('/home');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Ошибка входа. Проверьте данные и попробуйте снова'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Вход в аккаунт</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              required
            />
            {/* <div className="forgot-password">
              <a href="/forgot-password">Забыли пароль?</a>
            </div> */}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('успешн') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="register-link">
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </div>
      </div>
    </div>
  );
}