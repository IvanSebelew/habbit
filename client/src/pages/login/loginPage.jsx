import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Space, Alert, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import $api from '../../utils/axiosWithAuth';
import { setAccessToken } from '../../utils/tokenStore';

const { Title, Text } = Typography;
const { Content } = Layout;

export function LoginPage() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await $api.post('/auth/login', values);

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
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Card 
          style={{ 
            width: 400, 
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>🎯 TrackHabit</Title>
              <Text type="secondary">Войдите в свой аккаунт</Text>
            </div>

            {message && (
              <Alert 
                message={message} 
                type="error" 
                showIcon 
                closable 
              />
            )}

            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                label="Логин"
                rules={[{ required: true, message: 'Введите логин' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Ваш логин" 
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Пароль"
                rules={[{ required: true, message: 'Введите пароль' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Ваш пароль"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={isLoading}
                  style={{ width: '100%' }}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">
                Нет аккаунта?{' '}
                <Link to="/register">Зарегистрироваться</Link>
              </Text>
            </div>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}