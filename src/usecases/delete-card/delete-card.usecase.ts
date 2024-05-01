import { DeleteCardGatewayInterface } from '@/adapters/gateways/delete-card/delete-card.gateway.interface'
import { DeleteCardUseCaseInterface } from './delete-card.usecase.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { logger } from '@/shared/logger/logger.helper'

export class DeleteCardUseCase implements DeleteCardUseCaseInterface {
  constructor(private readonly gateway: DeleteCardGatewayInterface) {}
  async execute(id: string): Promise<void> {
    await this.validate(id)
    await this.gateway.deleteCard(id)
  }

  async validate(id: string): Promise<void> {
    if (!id) {
      logger.error('Missing param [cardId]')
      throw new MissingParamError('cardId')
    }

    logger.info(`DeleteCardUseCase<called>.\nInput: { id: ${id} }`)

    const cardExists = await this.gateway.getCardByd(id)
    if (!cardExists) {
      logger.error(`Card not found: ${id}`)
      throw new InvalidParamError('cardId')
    }
  }
}
