import { CardModel } from '../default.gateway'

export interface GetCardByIdGatewayInterface {
  getCardByd: (id: string) => Promise<CardModel | null>
}
