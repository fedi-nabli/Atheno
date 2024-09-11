import { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/taskModel'
import taskModel from '../models/taskModel'

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

const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task: ITask | null = await Task.findById(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }

    res.status(200).json(task)
  } catch (error) {
    next(new Error('An error occured while fetching task'))
  }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task: ITask | null = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }

    res.status(200).json({
      message: 'Task deleted successfully',
      success: true,
      task
    })
  } catch (error) {
    next(new Error('An error occured while deleting task'))
  }
}

const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task: ITask | null = await Task.findById(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }

    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.status = req.body.status || task.status
    task.dueDate = req.body.dueDate || task.dueDate

    await task.save()

    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}

export {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
}