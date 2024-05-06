import { forbiddenError, success, unauthorized } from '@/shared/helpers/http.helper'
import { HttpRequest } from '../controllers/controller.interface'
import { AuthenticationMiddlewareGatewayInterface } from '../gateways/authentication-middleware/authenticaton-middleware.gateway.interface'
import { logger } from '@/shared/logger/logger.helper'

export class AuthenticationMiddleware {
  constructor(private readonly gateway: AuthenticationMiddlewareGatewayInterface) {}
  async execute(input: HttpRequest): Promise<any> {
    if (!input?.headers?.appid || !input?.headers?.secretkey) {
      return forbiddenError()
    }

    const { appid, secretkey } = input.headers

    const application = await this.gateway.getApplicationByAppIdAndSecretKey({ appId: appid, secretKey: secretkey })
    if (!application) {
      logger.error(`Unauthorized Error: appId: ${appid}, secretkey: ${secretkey}`)
      return unauthorized()
    }

    return success(200, application)
  }
}
