const db = require('../models');
const Task = db.Task;

// @desc    Get all tasks for a user
// @route   GET /api/tasks
const getTasks = async(req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create new task
// @route   POST /api/tasks
const createTask = async(req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async(req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedTask = await task.update(req.body);
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async(req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// @desc    Delete a task
// @route   DELETE /api/tasks/:id

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};