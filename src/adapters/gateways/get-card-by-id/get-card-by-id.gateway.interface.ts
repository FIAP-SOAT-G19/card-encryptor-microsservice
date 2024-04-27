export type CardModel = {
  id: string
  encryptedCard: string
  createdAt: Date
}

export interface GetCardByIdGatewayInterface {
  getCardByd: (id: string) => Promise<CardModel | null>
}
