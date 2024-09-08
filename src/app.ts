import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db'

dotenv.config()
connectDB()