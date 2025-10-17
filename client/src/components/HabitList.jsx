import React, { useState, useEffect } from 'react';
import $api from '../utils/axiosWithAuth';
import { Form, Input, Select, Button, List, Tag, Space, message, Card, Spin, Alert } from 'antd';
import './HabitList.css';

const { Option } = Select;

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingHabit, setEditingHabit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await $api.get('/habits');
      setHabits(response.data);
    } catch {
      setError('Не удалось загрузить привычки');
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (values) => {
    try {
      const response = await $api.post('/habits', values);
      setHabits([...habits, response.data]);
      form.resetFields();
      message.success('Привычка добавлена!');
      setError('');
    } catch {
      setError('Не удалось создать привычку');
    }
  };

  const handleUpdateHabit = async (values) => {
    try {
      const response = await $api.put(`/habits/${editingHabit.id}`, values);
      const updatedHabits = habits.map(habit => 
        habit.id === editingHabit.id ? response.data : habit
      );
      setHabits(updatedHabits);
      setEditingHabit(null);
      editForm.resetFields();
      message.success('Привычка обновлена!');
      setError('');
    } catch {
      setError('Не удалось обновить привычку');
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      await $api.delete(`/habits/${habitId}`);
      setHabits(habits.filter(habit => habit.id !== habitId));
      message.success('Привычка удалена!');
      setError('');
    } catch {
      setError('Не удалось удалить привычку');
    }
  };

  const handleToggleHabit = async (habitId) => {
    try {
      const response = await $api.patch(`/habits/${habitId}/toggle`);
      const updatedHabits = habits.map(habit => 
        habit.id === habitId ? response.data : habit
      );
      setHabits(updatedHabits);
      setError('');
    } catch {
      setError('Не удалось обновить статус');
    }
  };

  const startEditing = (habit) => {
    setEditingHabit(habit);
    editForm.setFieldsValue({
      title: habit.title,
      frequency: habit.frequency
    });
  };

  const cancelEditing = () => {
    setEditingHabit(null);
    editForm.resetFields();
  };

  return (
    <Card title="Мои привычки">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {error && (
          <Alert message={error} type="error" showIcon />
        )}
        <Form
          form={form}
          onFinish={handleAddHabit}
          layout="inline"
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder="Название привычки" style={{ width: 200 }} />
          </Form.Item>
          
          <Form.Item name="frequency" initialValue="daily">
            <Select style={{ width: 120 }}>
              <Option value="daily">Ежедневно</Option>
              <Option value="weekly">Еженедельно</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
        {editingHabit && (
          <Card type="inner" title="Редактирование привычки">
            <Form
              form={editForm}
              onFinish={handleUpdateHabit}
              layout="inline"
            >
              <Form.Item
                name="title"
                rules={[{ required: true, message: 'Введите название' }]}
              >
                <Input placeholder="Название привычки" style={{ width: 200 }} />
              </Form.Item>
              
              <Form.Item name="frequency">
                <Select style={{ width: 120 }}>
                  <Option value="daily">Ежедневно</Option>
                  <Option value="weekly">Еженедельно</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
                <Button onClick={cancelEditing} style={{ marginLeft: 8 }}>
                  Отмена
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}

        {/* Список привычек */}
        <Spin spinning={loading}>
          <List
            dataSource={habits}
            locale={{ emptyText: 'У вас пока нет привычек. Добавьте первую!' }}
            renderItem={habit => (
              <List.Item
                actions={[
                  <Button 
                    type={habit.completed ? 'default' : 'primary'}
                    onClick={() => handleToggleHabit(habit.id)}
                  >
                    {habit.completed ? '✅ Выполнено' : '⚪ Не выполнено'}
                  </Button>,
                  <Button 
                    onClick={() => startEditing(habit)}
                    disabled={habit.completed}
                  >
                    ✏️
                  </Button>,
                  <Button 
                    danger 
                    onClick={() => handleDeleteHabit(habit.id)}
                  >
                    🗑️
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={habit.title}
                  description={
                    <Space>
                      <Tag color={habit.frequency === 'daily' ? 'blue' : 'green'}>
                        {habit.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно'}
                      </Tag>
                      {habit.owner && <span>👤 {habit.owner}</span>}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Spin>
      </Space>
    </Card>
  );
};

export default HabitList;