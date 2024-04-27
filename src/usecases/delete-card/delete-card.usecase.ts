import { DeleteCardGatewayInterface } from '@/adapters/gateways/delete-card/delete-card.gateway.interface'
import { DeleteCardUseCaseInterface } from './delete-card.usecase.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

export class DeleteCardUseCase implements DeleteCardUseCaseInterface {
  constructor(private readonly gateway: DeleteCardGatewayInterface) {}
  async execute(id: string): Promise<void> {
    await this.validate(id)
    await this.gateway.deleteCard(id)
  }

  async validate(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('cardId')
    }

    const cardExists = await this.gateway.getCardByd(id)
    if (!cardExists) {
      throw new InvalidParamError('cardId')
    }
  }
}
