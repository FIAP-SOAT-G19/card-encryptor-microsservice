import { HttpResponse } from '@/adapters/controllers/controller.interface'
import { ForbiddenError, UnauthorizedError } from '../errors'

export const success = (statusCode: number, body: any): HttpResponse => ({
  statusCode,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.name,
    message: error.message
  }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: {
    error: error.name,
    message: error.message
  }
})

export const forbiddenError = (): HttpResponse => ({
  statusCode: 403,
  body: new ForbiddenError()
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
