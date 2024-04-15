const Task = require('../models/Task');

const taskController = {};

// Create a new task
taskController.createTask = async (req, res) => {
    try {
        const { projectName, taskName, taskDescription, spendTime, priority, assigned, status, createdBy } = req.body;

        // Create new task
        const newTask = await Task.create({
            projectName,
            taskName,
            taskDescription,
            spendTime,
            priority,
            assigned,
            status,
            createdBy,
            updatedBy: createdBy, // Initially, the task is updated by the creator
        });

        // Respond with the created task
        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: 'Task creation failed' });
    }
};

// Read all tasks (with optional filtering)
taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        return res.json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Read a single task by ID
taskController.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.json(task);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch task' });
    }
};

// Update a task by ID
taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { projectName, taskName, taskDescription, spendTime, priority, assigned, status, updatedBy } = req.body;

        // Find task and update it
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update task fields
        task.projectName = projectName;
        task.taskName = taskName;
        task.taskDescription = taskDescription;
        task.spendTime = spendTime;
        task.priority = priority;
        task.assigned = assigned;
        task.status = status;
        task.updatedBy = updatedBy;

        // Save updated task
        await task.save();

        // Respond with updated task
        return res.json(task);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update task' });
    }
};

// Delete a task by ID
taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task and delete it
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();

        // Respond with success message
        return res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete task' });
    }
};

module.exports = taskController;
