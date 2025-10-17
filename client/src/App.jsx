import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/mainPage';
import { RegisterPage } from './pages/registration/registerPage';
import { LoginPage } from './pages/login/loginPage';
import { HomePage } from './pages/home/HomePage';
import './App.css';
import { TemplatesPage } from './pages/template/TemplatesPage';

export function App() {
  


  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
    </div>
  );
}

export default App; 