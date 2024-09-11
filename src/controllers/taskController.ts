import { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/taskModel'

const getAllTasks = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200)
    res.json({
      tasks,
      count: tasks.length
    })
  } catch (error) {
    next(new Error('Error fetching tasks'))
  }
}

const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      title,
      description,
      status,
      dueDate
    } = req.body

    const task: ITask = new Task({
      title,
      description,
      status,
      dueDate
    })
    await task.save()

    res.status(201).json(task)
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
    next(new Error('Invalid data'))
  }
}

export {
  getAllTasks,
  createTask
}