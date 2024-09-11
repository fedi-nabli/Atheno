import express, { Router } from 'express'

import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController'

const router: Router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask)

export default router