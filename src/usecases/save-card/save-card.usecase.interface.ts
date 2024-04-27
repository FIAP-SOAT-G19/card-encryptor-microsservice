export interface SaveCardUseCaseInterface {
  execute: (encryptedCard: string) => Promise<string>
}
