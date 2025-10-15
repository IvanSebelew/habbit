const bcrypt = require('bcryptjs');
const { Users } = require('../../db/models');
const generateTokens = require('../utils/generateToken');

class AuthService {
  static async register({ username, email, password, role ='user' }) {
    if (!username || !email || !password) {
      throw new Error('Логин, email и пароль обязательны');
    }

    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Пользователь уже существует');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({ 
      username, 
      email, 
      password: hash,
      role,
    });

    const { accessToken, refreshToken } = generateTokens(user);
    
    return {
      accessToken,
      refreshToken,
      user: {  
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }

  static async login({ username, password }) {
    if (!username || !password) {
      throw new Error('Логин и пароль обязательны');
    }

    const user = await Users.findOne({ where: { username } });
    if (!user) {
      throw new Error('Неверные учетные данные');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Неверные учетные данные');
    }

    const { accessToken, refreshToken } = generateTokens(user);
    
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }

  static async refreshTokens(userId) {
    if (!userId) {
      throw new Error('Необходим идентификатор пользователя');
    }
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const { accessToken, refreshToken } = generateTokens(user);
    return {
      accessToken,
      refreshToken
    };
  }

  static async logout() {
    return { success: true };
  }
}

module.exports = AuthService;