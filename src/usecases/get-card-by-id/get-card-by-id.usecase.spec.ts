import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { GetCardByIdUseCase } from './get-card-by-id.usecase'
import { mock } from 'jest-mock-extended'
import { GetCardByIdGatewayInterface } from '@/adapters/gateways/get-card-by-id/get-card-by-id.gateway.interface'

const gateway = mock<GetCardByIdGatewayInterface>()

describe('GetCardByIdUseCase', () => {
  let sut: GetCardByIdUseCase
  let cardId: string

  beforeEach(() => {
    sut = new GetCardByIdUseCase(gateway)
    cardId = 'anyCardId'

    gateway.getCardByd.mockResolvedValue({ id: 'anyCardId', encryptedCard: 'anyEncryptedCard', createdAt: new Date() })
  })

  test('should throw if cardId is not provided', async () => {
    await expect(sut.execute('')).rejects.toThrow(new MissingParamError('cardId'))
  })

  test('should call gateway.getCardByd once and with correct cardId', async () => {
    await sut.execute(cardId)
    expect(gateway.getCardByd).toHaveBeenCalledTimes(1)
    expect(gateway.getCardByd).toHaveBeenCalledWith(cardId)
  })

  test('should throw if gateway.getCardByd return null', async () => {
    gateway.getCardByd.mockResolvedValueOnce(null)
    await expect(sut.execute(cardId)).rejects.toThrow(new InvalidParamError('cardId'))
  })

  test('should return a correct v', async () => {
    const encryptedCard = await sut.execute(cardId)
    expect(encryptedCard).toBe('anyEncryptedCard')
  })
})
