import { prismaClient } from '../prisma.client'
import { AuthenticationMiddlewareGatewayInterface, AuthenticationMiddlewareInput, AuthenticationMiddlewareOutput } from './authenticaton-middleware.gateway.interface'

export class AuthenticationMiddlewareGateway implements AuthenticationMiddlewareGatewayInterface {
  async getApplicationByAppIdAndSecretKey (input: AuthenticationMiddlewareInput): Promise<AuthenticationMiddlewareOutput | null> {
    const { appId, secretKey } = input
    const application = await prismaClient.applications.findUnique({ where: { appId, secretKey } })
    return application ?? null
  }
}
