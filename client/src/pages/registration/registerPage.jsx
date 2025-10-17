import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select, Card, Typography, Space, Alert, Layout } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import $api from '../../utils/axiosWithAuth';
import { setAccessToken } from '../../utils/tokenStore';

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

export function RegisterPage() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await $api.post('/auth/register', values);

      if (response.status >= 200 && response.status < 300) {
        setMessage('Регистрация успешна! Перенаправляем...');
        setMessageType('success');
        setAccessToken(response.data.accessToken);

        console.log('✅ Регистрация успешна, токен сохранен:', {
          accessToken: response.data.accessToken ? 'есть' : 'нет',
          username: response.data.username,
          role: response.data.role
        });
        
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (error) {
      let errorMessage = 'Ошибка сервера. Пожалуйста, попробуйте позже';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 409) {
        errorMessage = 'Пользователь с таким именем или email уже существует';
      }
      
      setMessage(errorMessage);
      setMessageType('error');
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
              <Text type="secondary">Создайте новый аккаунт</Text>
            </div>

            {message && (
              <Alert 
                message={message} 
                type={messageType} 
                showIcon 
                closable 
              />
            )}

            <Form
              form={form}
              name="register"
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                label="Имя пользователя"
                rules={[
                  { required: true, message: 'Введите имя пользователя' },
                  { min: 2, message: 'Имя должно содержать минимум 2 символа' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Придумайте уникальное имя" 
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Введите email' },
                  { type: 'email', message: 'Некорректный email' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Ваш email" 
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Пароль"
                rules={[
                  { required: true, message: 'Введите пароль' },
                  { min: 1, message: 'Пароль должен содержать минимум 1 символ' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Не менее 1 символа"
                />
              </Form.Item>

              <Form.Item
                name="role"
                label="Роль"
                initialValue="user"
              >
                <Select>
                  <Option value="user">Пользователь</Option>
                  <Option value="admin">Администратор</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={isLoading}
                  style={{ width: '100%' }}
                >
                  {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">
                Уже есть аккаунт?{' '}
                <Link to="/login">Войти</Link>
              </Text>
            </div>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}