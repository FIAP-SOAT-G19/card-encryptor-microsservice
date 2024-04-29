import { DeleteCardController } from '@/adapters/controllers/delete-card/delete-card.controller'
import { DeleteCardGateway } from '@/adapters/gateways/delete-card/delete-card.gateway'
import { DeleteCardUseCase } from '@/usecases/delete-card/delete-card.usecase'

export const makeDeleteCardControllerFactory = (): DeleteCardController => {
  const gateway = new DeleteCardGateway()
  const deleteCardUseCase = new DeleteCardUseCase(gateway)
  return new DeleteCardController(deleteCardUseCase)
}
