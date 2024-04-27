import { SaveCardGatewayInterface } from '@/adapters/gateways/save-card/save-card.gateway.interface'
import { SaveCardUseCaseInterface } from './save-card.usecase.interface'
import { CrypotInterface } from '@/adapters/tools/crypto/crypto.adapter.interface'
import { isValidString } from '@/shared/helpers/string.helper'
import { InvalidParamError } from '@/shared/errors'

export class SaveCardUseCase implements SaveCardUseCaseInterface {
  constructor(
    private readonly gateway: SaveCardGatewayInterface,
    private readonly crypto: CrypotInterface
  ) {}

  async execute (encryptedCard: string): Promise<string> {
    if (!isValidString(encryptedCard)) {
      throw new InvalidParamError('encryptedCard')
    }

    return this.gateway.saveCard({
      id: this.crypto.generateUUID(),
      encryptedCard,
      createdAt: new Date()
    })
  }
}
