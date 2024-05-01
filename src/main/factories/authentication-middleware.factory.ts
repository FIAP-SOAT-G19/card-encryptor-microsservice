import { AuthenticationMiddlewareGateway } from '@/adapters/gateways/authentication-middleware/authentication-middleware.gateway'
import { AuthenticationMiddleware } from '@/adapters/middlewares/authentication.middleware'

export const makeAuthenticationMiddlewareFactory = (): AuthenticationMiddleware => {
  const gateway = new AuthenticationMiddlewareGateway()
  return new AuthenticationMiddleware(gateway)
}
