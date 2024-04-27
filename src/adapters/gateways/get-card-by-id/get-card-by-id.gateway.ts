import { prismaClient } from '../prisma.client'
import { CardModel, GetCardByIdGatewayInterface } from './get-card-by-id.gateway.interface'

export class GetCardByIdGateway implements GetCardByIdGatewayInterface {
  async getCardByd(id: string): Promise<CardModel | null> {
    const card = prismaClient.cards.findFirst({ where: { id } })
    return card ?? null
  }
}
