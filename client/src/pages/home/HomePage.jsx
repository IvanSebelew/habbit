import React from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../utils/axiosWithAuth';
import HabitList from '../../components/HabitList';
import { Button, Space, Layout, Typography } from 'antd';
import './HomePage.css';

const { Header, Content } = Layout;
const { Title } = Typography;

export function HomePage() {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await $api.post('/auth/logout'); 
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleTemplates = () => {
    navigate('/templates');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            🎯 Трекер привычек
          </Title>
          <Space>
            <Button type="primary" onClick={handleTemplates}>
              📚 Шаблоны привычек
            </Button>
            <Button onClick={handleLogout}>
              Выйти
            </Button>
          </Space>
        </div>
      </Header>
      
      <Content style={{ padding: '20px' }}>
        <HabitList />
      </Content>
    </Layout>
  );
}