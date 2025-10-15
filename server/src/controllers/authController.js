const AuthService = require('../services/authService');

class AuthController {
  static async handleAuthResponse(res, result) {
    res
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .cookie('username', result.user.username, { 
        httpOnly: false,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({ 
        accessToken: result.accessToken, 
        username: result.user.username,
        role: result.user.role 
      });
  }

  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const result = await AuthService.register({ username, email, password, role });
      await AuthController.handleAuthResponse(res, result);
    } catch (error) {
      console.error('Register error:', error);
      const status = error.message.includes('обязательны') || 
                    error.message.includes('уже существует') ? 400 : 500;
      res.status(status).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login({ username, password });
      await AuthController.handleAuthResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Попробуй еще разок' });
    }
  }

  static async refresh(req, res) {
    try {
      const userId = res.locals.userId;
      const tokens = await AuthService.refreshTokens(userId);

      res
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({ accessToken: tokens.accessToken });

    } catch (error) {
      console.error('Refresh error:', error);
      res.status(401).json({ message: 'Недействительный токен' });
    }
  }

  static async logout(req, res) {
    try {
      res
        .clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict'
        })
        .clearCookie('username', { 
          secure: true,
          sameSite: 'Strict'
        })
        .json({ message: 'Выход выполнен успешно' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Ошибка выхода' });
    }
  }
}

module.exports = AuthController;