import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../utils/axiosWithAuth';
import { Card, Button, Select, Row, Col, Tag, message, Spin, Space, Alert } from 'antd';
import './TemplateList.css';

const { Option } = Select;

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await $api.get('/templates');
        setTemplates(response.data);
      } catch {
        setError('Не удалось загрузить шаблоны');
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const createHabit = async (templateId) => {
    try {
      await $api.post(`/templates/${templateId}/habits`);
      message.success('Привычка создана!');
      navigate('/home');
    } catch {
      message.error('Ошибка создания привычки');
    }
  };

  const allCategoryNames = templates.map(template =>
    template.categories?.map(category => category.name) || []
  ).flat();

  const uniqueCategories = [...new Set(allCategoryNames)];

  const categories = ['all', ...uniqueCategories];

  let filteredTemplates = templates;
  if (selectedCategory !== 'all') {
    filteredTemplates = templates.filter(template =>
      template.categories?.some(category => category.name === selectedCategory)
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="template-list">
      {error && (
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}

      <div className="filter" style={{ marginBottom: '20px' }}>
        <Space>
          <span>Категория:</span>
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: 200 }}
          >
            {categories.map(category => (
              <Option key={category} value={category}>
                {category === 'all' ? 'Все категории' : category}
              </Option>
            ))}
          </Select>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {filteredTemplates.map(template => (
          <Col xs={24} sm={12} lg={8} key={template.id}>
            <Card
              title={template.title}
              style={{ height: '100%' }}
              actions={[
                <Button 
                  type="primary" 
                  onClick={() => createHabit(template.id)}
                  style={{ width: '100%' }}
                >
                  Создать привычку
                </Button>
              ]}
            >
              <p style={{ marginBottom: '16px' }}>{template.description}</p>

              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div>
                  <Tag color={template.frequency === 'daily' ? 'blue' : 'green'}>
                    {template.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно'}
                  </Tag>
                </div>
                
                <div>
                  {template.categories?.map(category => (
                    <Tag key={category.id} color="purple">
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TemplateList;