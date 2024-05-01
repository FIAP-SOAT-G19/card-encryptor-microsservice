export type AuthenticationMiddlewareInput = {
  appId: string
  secretKey: string
}

export type AuthenticationMiddlewareOutput = {
  id: string
  appId: string
  description: string
  secretKey: string
}

export interface AuthenticationMiddlewareGatewayInterface {
  getApplicationByAppIdAndSecretKey: (input: AuthenticationMiddlewareInput) => Promise<AuthenticationMiddlewareOutput | null>
}
