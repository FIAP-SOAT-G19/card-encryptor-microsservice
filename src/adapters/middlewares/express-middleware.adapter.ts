import { NextFunction, Response, Request } from 'express'
import { HttpRequest } from '../controllers/controller.interface'
import { AuthenticationMiddleware } from './authentication.middleware'

export const expressMiddlewareAdapter = (middleware: AuthenticationMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input: HttpRequest = {
      headers: req.headers
    }

    const { statusCode, body } = await middleware.execute(input)

    if (statusCode >= 200 && statusCode <= 399) {
      next()
      return
    }

    res.status(Number(statusCode)).json({ error: body.message })
  }
}
