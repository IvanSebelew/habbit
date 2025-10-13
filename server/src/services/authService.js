const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateToken'); 

class AuthService {
  static async register({ username, email, password }) {
    if (!username || !email || !password) {
      throw new Error('Логин, email и пароль обязательны');
    }

    const existingUser = await User.findOne({ 
      where: { username } 
    });
    
    if (existingUser) {
      throw new Error('Пользователь уже существует');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      username, 
      email, 
      password: hash 
    });

        const { accessToken, refreshToken } = generateTokens(user.id);
    
    return {
      accessToken,
      refreshToken,
      user: {  
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  static async login({ username, password }) {
    if (!username || !password) {
      throw new Error('Логин и пароль обязательны');
    }

    const user = await User.findOne({ 
      where: { username } 
    });
    
    if (!user) {
      throw new Error('Неверные учетные данные');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Неверные учетные данные');
    }

    const { accessToken, refreshToken } = generateTokens(user.id);
    
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  static async refreshTokens(userId) {
    if (!userId) {
      throw new Error('Необходим идентификатор пользователя');
    }

    const { accessToken, refreshToken } = generateTokens(userId);
    
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