import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import $api from '../../utils/axiosWithAuth';
import { setAccessToken } from '../../utils/tokenStore';

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
      const response = await $api.post(
        '/auth/login',
        { username, password }, 
        
      );

      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
         console.log('✅ Логин успешен, токен сохранен:', {
          accessToken: response.data.accessToken ? 'есть' : 'нет',
          username: response.data.username,
          role: response.data.role
        });
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