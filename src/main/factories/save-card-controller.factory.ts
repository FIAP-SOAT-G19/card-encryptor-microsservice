import { SaveCardController } from '@/adapters/controllers/save-card/save-card.controller'
import { SaveCardGateway } from '@/adapters/gateways/save-card/save-card.gateway'
import { Cryptodapter } from '@/adapters/tools/crypto/crypto.adapter'
import { SaveCardUseCase } from '@/usecases/save-card/save-card.usecase'

export const makeSaveCardControllerFactory = (): SaveCardController => {
  const gateway = new SaveCardGateway()
  const crypto = new Cryptodapter()
  const saveCardUseCase = new SaveCardUseCase(gateway, crypto)
  return new SaveCardController(saveCardUseCase)
}
