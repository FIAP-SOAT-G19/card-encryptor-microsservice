export type SaveCardGatewayInput = {
  id: string
  encryptedCard: string
  createdAt: Date
}

export interface SaveCardGatewayInterface {
  saveCard: (input: SaveCardGatewayInput) => Promise<string>
}
