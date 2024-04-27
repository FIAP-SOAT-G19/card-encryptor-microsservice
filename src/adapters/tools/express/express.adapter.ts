import { ControllerInterface, HttpRequest, HttpResponse } from '@/adapters/controllers/controller.interface'
import { prismaClient } from '@/adapters/gateways/prisma.client'
import { Request, Response } from 'express'
import { Cryptodapter } from '../crypto/crypto.adapter'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      params: req?.params,
      body: req?.body,
      query: req?.query,
      headers: req?.headers
    }

    const { statusCode, body }: HttpResponse = await controller.execute(input)

    const output = (statusCode >= 200 && statusCode < 500) ? body : { error: body.message }

    await logRequest(req, input, statusCode, output)

    res.status(statusCode).json(output)
  }
}

const logRequest = async (req: Request, input: any, statusCode: number, output: any): Promise<void> => {
  const crypto = new Cryptodapter()
  await prismaClient.request.create({
    data: {
      id: crypto.generateUUID(),
      appId: input?.headers?.appid ?? undefined,
      method: req.method,
      input: JSON.stringify(input.body),
      path: req.url,
      createdAt: new Date(),
      status: statusCode,
      output: JSON.stringify(output),
      updatedAt: new Date()
    }
  })
}
