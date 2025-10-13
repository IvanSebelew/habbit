const express = require('express');
const router = express.Router();
const HabitController = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');
const habitOwnerCheck = require('../middlewares/habitOwnerCheck');


router.use(authMiddleware);


router.get('/', HabitController.getAll); 
router.post('/', HabitController.create); 

router.put('/:id', habitOwnerCheck, HabitController.update); 

router.delete('/:id', habitOwnerCheck, HabitController.delete); 


router.patch('/:id/complete', habitOwnerCheck, HabitController.complete); 
module.exports = router;