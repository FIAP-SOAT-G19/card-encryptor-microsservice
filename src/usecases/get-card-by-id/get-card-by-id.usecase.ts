import { GetCardByIdGatewayInterface } from '@/adapters/gateways/get-card-by-id/get-card-by-id.gateway.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'
import { GetCardByIdUseCaseInterface } from './get-card-by-id.usecase.interface'
import { logger } from '@/shared/logger/logger.helper'

export class GetCardByIdUseCase implements GetCardByIdUseCaseInterface {
  constructor(private readonly gateway: GetCardByIdGatewayInterface) {}
  async execute (id: string): Promise<string> {
    if (!isValidString(id)) {
      logger.error('Missing param [cardId]')
      throw new MissingParamError('cardId')
    }

    logger.info(`GetCardByIdUseCase<called>.\nInput: { id: ${id} }`)

    const card = await this.gateway.getCardByd(id)
    if (!card) {
      logger.error(`Card not found: ${id}`)
      throw new InvalidParamError('cardId')
    }

    return card.encryptedCard
  }
}
