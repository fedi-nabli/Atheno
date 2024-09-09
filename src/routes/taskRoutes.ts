import express, { Router } from 'express'

import {
  getAllTasks
} from '../controllers/taskController'

const router: Router = express.Router()

router.get('/', getAllTasks)

export default router