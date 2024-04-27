import { GetCardByIdGatewayInterface } from '@/adapters/gateways/get-card-by-id/get-card-by-id.gateway.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'
import { GetCardByIdUseCaseInterface } from './get-card-by-id.usecase.interface'

export class GetCardByIdUseCase implements GetCardByIdUseCaseInterface {
  constructor(private readonly gateway: GetCardByIdGatewayInterface) {}
  async execute (id: string): Promise<string> {
    if (!isValidString(id)) {
      throw new MissingParamError('cardId')
    }

    const card = await this.gateway.getCardByd(id)
    if (!card) {
      throw new InvalidParamError('cardId')
    }

    return card.encryptedCard
  }
}
