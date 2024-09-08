import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db'
import { notFound, errorHandler } from './middleware/errorMiddleware'

dotenv.config()
connectDB()

const app: Express = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(colors.yellow.bold(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)))