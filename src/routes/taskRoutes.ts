import express, { Router } from 'express'

import {
  getAllTasks,
  createTask
} from '../controllers/taskController'

const router: Router = express.Router()

router.route('/').get(getAllTasks).post(createTask)

export default router