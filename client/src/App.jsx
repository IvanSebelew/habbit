import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/mainPage';
import { RegisterPage } from './pages/registration/registerPage';
import { LoginPage } from './pages/login/loginPage';
import { HomePage } from './pages/home/HomePage';
import { TemplatesPage } from './pages/template/TemplatesPage';
import { ConfigProvider } from 'antd'; // Импортируем провайдер
import 'antd/dist/reset.css'; // Сбрасываем стандартные стили
import './App.css';

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff', 
        },
      }}
    >
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;