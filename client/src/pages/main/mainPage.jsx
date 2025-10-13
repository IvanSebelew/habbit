import './mainPage.css'
export function MainPage() {
  return (
    <div className="main-container">
      <div className="main-content">
        <h1 className="main-title">Habit Tracker</h1>
        <p className="main-description">
          Простой и удобный трекер привычек, который поможет вам выработать полезные 
          привычки и избавиться от вредных. Отслеживайте свой прогресс ежедневно!
        </p>
        
        <div className="features">
          <div className="feature-card">
            <h3>📊 Статистика</h3>
            <p>Наглядные графики вашего прогресса</p>
          </div>
          <div className="feature-card">
            <h3>⏰ Напоминания</h3>
            <p>Не пропускайте важные действия</p>
          </div>
          <div className="feature-card">
            <h3>👥 Сообщество</h3>
            <p>Следите за привычками друзей</p>
          </div>
        </div>

        <div className="auth-links">
          <a href="/register" className="auth-btn register-btn">Зарегистрироваться</a>
          <a href="/login" className="auth-btn login-btn">Авторизоваться</a>
        </div>
      </div>
    </div>
  );
}