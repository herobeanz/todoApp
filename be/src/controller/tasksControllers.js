import Task from '../models/Task.js';


export const getAllTasks = async (req, res) => {
    try {
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [
                        { $sort: { createdAt: -1 } },
                    ],
                    activeCount: [
                        { $match: { status: 'active' } },
                        { $count: 'count' },
                    ],
                    completedCount: [
                        { $match: { status: 'completed' } },
                        { $count: 'count' },
                    ],
                },
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completedCount = result[0].completedCount[0]?.count || 0;


        res.status(200).json({tasks, activeCount, completedCount});
    } catch (error) {
        console.log("Error calling getAllTasks: ", error);
        res.status(500).json({ message: "System error" });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = await Task.create({ title });
        res.status(201).json(newTask);
    } catch (error) {
        console.log("Error calling createTask: ", error);
        res.status(500).json({ message: "System error" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, status, completedAt }, { new: true });
        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json(updatedTask);

    } catch (error) {
        console.log("Error calling updateTask: ", error);
        res.status(500).json({ message: "System error" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(deleteTask);

    } catch (error) {
        console.log("Error calling deleteTask: ", error);
        res.status(500).json({ message: "System error" });
    }
}