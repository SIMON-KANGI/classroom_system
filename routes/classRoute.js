const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/classes', classController.getAllClasses);
router.post('/classes', classController.createClass);
router.get('/classes/:id', classController.getClassById);
router.put('/classes/:id',classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

module.exports = router;
