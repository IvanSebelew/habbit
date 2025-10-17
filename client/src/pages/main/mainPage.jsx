import { Layout, Typography, Card, Row, Col, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { BarChartOutlined, PlusOutlined, TeamOutlined, RocketOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export function MainPage() {
  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Content style={{ padding: '50px 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            {/* Заголовок и описание */}
            <div style={{ marginBottom: '40px' }}>
              <Title 
                level={1} 
                style={{ 
                  color: 'white', 
                  marginBottom: '16px',
                  fontSize: '3rem',
                  fontWeight: 'bold'
                }}
              >
                🎯 Habit Tracker
              </Title>
              <Paragraph 
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: '1.2rem',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Создавайте полезные привычки и отслеживайте свой прогресс. 
                Начните с готовых шаблонов или создайте свои уникальные привычки!
              </Paragraph>
            </div>

            {/* Карточки фич */}
            <Row gutter={[24, 24]} style={{ marginBottom: '50px' }}>
              <Col xs={24} md={6}>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <PlusOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                    <Title level={3}>📝 Создание</Title>
                    <Paragraph type="secondary">
                      Создавайте привычки вручную или используйте готовые шаблоны
                    </Paragraph>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} md={6}>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                    <Title level={3}>📊 Отслеживание</Title>
                    <Paragraph type="secondary">
                      Отмечайте выполнение и следите за своим прогрессом
                    </Paragraph>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} md={6}>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <RocketOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
                    <Title level={3}>🎯 Шаблоны</Title>
                    <Paragraph type="secondary">
                      Готовые шаблоны привычек для быстрого старта
                    </Paragraph>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={6}>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <TeamOutlined style={{ fontSize: '48px', color: '#eb2f96', marginBottom: '16px' }} />
                    <Title level={3}>📈 Прогресс</Title>
                    <Paragraph type="secondary">
                      Анализируйте свою статистику и достижения
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Дополнительная информация о функциях */}
            <Row gutter={[24, 24]} style={{ marginBottom: '30px' }}>
              <Col xs={24} md={12}>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Title level={4} style={{ color: 'white' }}>✨ Что вы можете делать:</Title>
                    <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'left' }}>
                      • Создавать привычки с разной периодичностью<br/>
                      • Использовать готовые шаблоны из галереи<br/>
                      • Отслеживать выполнение ежедневно/еженедельно<br/>
                      • Редактировать и удалять привычки<br/>
                      • Анализировать свой прогресс<br/>
                      • Создавать привычки из категорий: Здоровье, Спорт, Образование, Финансы
                    </Paragraph>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Title level={4} style={{ color: 'white' }}>🚀 Как начать:</Title>
                    <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'left' }}>
                      1. Зарегистрируйтесь или войдите в аккаунт<br/>
                      2. Перейдите в "Шаблоны привычек"<br/>
                      3. Выберите понравившийся шаблон<br/>
                      4. Нажмите "Создать привычку"<br/>
                      5. Отслеживайте выполнение на главной странице<br/>
                      6. Создавайте собственные привычки при необходимости
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Кнопки авторизации */}
            <Space size="large" style={{ marginTop: '20px' }}>
              <Link to="/register">
                <Button 
                  type="primary" 
                  size="large"
                  style={{
                    height: '50px',
                    padding: '0 32px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #1890ff, #36cfc9)',
                    border: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Начать сейчас - Зарегистрироваться
                </Button>
              </Link>
              
              <Link to="/login">
                <Button 
                  size="large"
                  style={{
                    height: '50px',
                    padding: '0 32px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid white',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Уже есть аккаунт? Войти
                </Button>
              </Link>
            </Space>

            {/* Дополнительная информация */}
            <div style={{ marginTop: '30px' }}>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                Присоединяйтесь к тысячам пользователей, которые уже улучшили свою жизнь с помощью TrackHabit!
              </Paragraph>
            </div>
          </Space>
        </div>
      </Content>
    </Layout>
  );
}