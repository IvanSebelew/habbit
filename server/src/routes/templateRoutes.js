const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/templateController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);


router.get('/', TemplateController.getAll); 
router.post('/:templateId/habits', TemplateController.createHabit); 

module.exports = router;