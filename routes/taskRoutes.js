const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); 
// path aap apne project structure ke hisaab se adjust kar sakte hain

// Route for creating a new task
router.post('/tasks', taskController.createTask);

// Route for getting all tasks
router.get('/tasks', taskController.getAllTasks);

// Route for getting a specific task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Route for updating a specific task by ID
router.put('/tasks/:id', taskController.updateTask);

// Route for deleting a specific task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
