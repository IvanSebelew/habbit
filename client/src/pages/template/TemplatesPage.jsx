import React from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateList from '../../components/TemplateList';
import { Layout, Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './TemplatesPage.css';

const { Header, Content } = Layout;
const { Title } = Typography;

export function TemplatesPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ color: 'white' }}
          >
            Назад
          </Button>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Галерея шаблонов
          </Title>
        </div>
      </Header>
      
      <Content style={{ padding: '20px' }}>
        <TemplateList />
      </Content>
    </Layout>
  );
}