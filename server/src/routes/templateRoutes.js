const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/templateController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Только 2 эндпоинта:
router.get('/', TemplateController.getAll); // GET /templates
router.post('/:templateId/habits', TemplateController.createHabit); // POST /templates/5/habits

module.exports = router;