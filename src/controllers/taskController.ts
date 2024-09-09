import { Request, Response } from 'express'
import Task, { ITask } from '../models/taskModel'

const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200)
    res.json({
      tasks,
      count: tasks.length
    })
  } catch (error) {
    res.status(500)
    res.json({
      message: 'Error fetching tasks',
      error
    })
  }
}

export {
  getAllTasks
}