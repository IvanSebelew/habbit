const AuthService = require('../services/authService');


class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                throw new Error('Логин, email и пароль обязательны');
            }

            const { accessToken, refreshToken } = await AuthService.register({
                username,
                email,
                password
            });

            res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                .cookie('username', username, { 
                    httpOnly: false, // Чтобы фронтенд мог читать
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                .json({ accessToken, username });

        } catch (error) {
            console.error('Register error:', error);
            if (error.message.includes('обязательны') || error.message.includes('уже существует')) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Ошибка регистрации' });
            }
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                throw new Error('Логин и пароль обязательны');
            }

            const { accessToken, refreshToken } = await AuthService.login({
                username,
                password
            });

            res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                .cookie('username', username, { 
                    httpOnly: false, 
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                .json({ accessToken, username });

        } catch (error) {

            res.status(500).json({ message: 'Попробуй еще разок' });

        }
    }

    static async refresh(req, res) {
        try {
            const { userId } = req.body;
            const tokens = await AuthService.refreshTokens(userId);

            res
                .cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
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
            .status(200)
            .json({ message: 'Выход выполнен успешно' });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ message: 'Ошибка выхода' });
        }
    }
}

module.exports = AuthController;