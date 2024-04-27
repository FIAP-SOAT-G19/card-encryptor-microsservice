import { prismaClient } from '../prisma.client'
import { SaveCardGatewayInput, SaveCardGatewayInterface } from './save-card.gateway.interface'

export class SaveCardGateway implements SaveCardGatewayInterface {
  async saveCard(data: SaveCardGatewayInput): Promise<string> {
    const card = await prismaClient.cards.create({ data })
    return card.id
  }
}
