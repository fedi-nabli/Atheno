import express, { Router } from 'express'

import {
  getAllTasks,
  createTask,
  getTaskById
} from '../controllers/taskController'

const router: Router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTaskById)

export default router