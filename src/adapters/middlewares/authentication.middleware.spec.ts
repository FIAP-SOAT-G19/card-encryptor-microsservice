import { mock } from 'jest-mock-extended'
import { HttpRequest } from '../controllers/controller.interface'
import { AuthenticationMiddleware } from './authentication.middleware'
import { AuthenticationMiddlewareGatewayInterface } from '../gateways/authentication-middleware/authenticaton-middleware.gateway.interface'
import { ForbiddenError, UnauthorizedError } from '@/shared/errors'

const gateway = mock<AuthenticationMiddlewareGatewayInterface>()
const fakeApp = {
  id: 'anyId',
  appId: 'anyAppId',
  description: 'AnyDescription',
  secretKey: 'anySecretKey'
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: HttpRequest

  beforeEach(() => {
    sut = new AuthenticationMiddleware(gateway)
    input = {
      headers: {
        appid: 'anyAppId',
        secretkey: 'anySecretKey'
      }
    }
    gateway.getApplicationByAppIdAndSecretKey.mockResolvedValue(fakeApp)
  })

  test('should returns 403 if headers is not provided', async () => {
    input.headers = null

    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 403, body: new ForbiddenError() })
  })

  test('should return 403 if Auhtorization header is falsy', async () => {
    input = null as any

    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 403, body: new ForbiddenError() })
  })

  test('should call gateway.getApplicationByAppIdAndSecretKey once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.getApplicationByAppIdAndSecretKey).toHaveBeenCalledTimes(1)
    expect(gateway.getApplicationByAppIdAndSecretKey).toHaveBeenCalledWith({ appId: 'anyAppId', secretKey: 'anySecretKey' })
  })

  test('should returns 401 if gateway.getApplicationByAppIdAndSecretKey return null', async () => {
    gateway.getApplicationByAppIdAndSecretKey.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 401, body: new UnauthorizedError() })
  })

  test('should return 200 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 200, body: fakeApp })
  })
})
