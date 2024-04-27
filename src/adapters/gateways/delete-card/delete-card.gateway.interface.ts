import { CardModel } from '../default.gateway'

export interface DeleteCardGatewayInterface {
  getCardByd: (id: string) => Promise<CardModel | null>
  deleteCard: (id: string) => Promise<void>
}
