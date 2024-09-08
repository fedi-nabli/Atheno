import { Request, Response, NextFunction } from 'express'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.send({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export {
  notFound,
  errorHandler
}