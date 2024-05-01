export interface GetCardByIdUseCaseInterface {
  execute: (id: string) => Promise<string>
}
