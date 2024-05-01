import { prismaClient } from './prisma.client'

export type CardModel = {
  id: string
  encryptedCard: string
  createdAt: Date
}

export class DefaultGateway {
  async getCardByd(id: string): Promise<CardModel | null> {
    const card = prismaClient.cards.findFirst({ where: { id } })
    return card ?? null
  }

  async deleteCard(id: string): Promise<void> {
    await prismaClient.cards.delete({ where: { id } })
  }
}
