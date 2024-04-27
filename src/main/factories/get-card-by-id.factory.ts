import { GetCardByIdController } from '@/adapters/controllers/get-card-by-id/get-card-by-id.controller'
import { GetCardByIdGateway } from '@/adapters/gateways/get-card-by-id/get-card-by-id.gateway'
import { GetCardByIdUseCase } from '@/usecases/get-card-by-id/get-card-by-id.usecase'

export const makeGetCardByIdControllerFactory = (): GetCardByIdController => {
  const gateway = new GetCardByIdGateway()
  const getCardByIdUseCase = new GetCardByIdUseCase(gateway)
  return new GetCardByIdController(getCardByIdUseCase)
}
