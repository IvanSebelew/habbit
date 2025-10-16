const { Habit } = require('../../db/models');

module.exports = async (req, res, next) => {
  try {
    const userRole = res.locals.user?.role;
  
    if (userRole === 'admin') {
      return next();
    }

    const habit = await Habit.findOne({
      where: {
        id: req.params.id,
        userId: res.locals.userId
      }
    });

    if (!habit) {
      return res.status(403).json({
        error: 'Доступ запрещён: это не ваша привычка'
      });
    }
    // req.habit = habit;
     res.locals.habit = habit;
    next();
  } catch (error) {
    console.error('Ошибка проверки владельца привычки:', error);
    res.status(500).json({ error: 'Ошибка сервера при проверке доступа' });
  }
};