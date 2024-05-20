import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { GetCardByIdUseCase } from './get-card-by-id.usecase'
import { mock } from 'jest-mock-extended'
import { GetCardByIdGatewayInterface } from '@/adapters/gateways/get-card-by-id/get-card-by-id.gateway.interface'
import { logger } from '@/shared/logger/logger.helper'

const gateway = mock<GetCardByIdGatewayInterface>()

describe('GetCardByIdUseCase', () => {
  let sut: GetCardByIdUseCase
  let cardId: string

  beforeAll(() => {
    jest.spyOn(logger, 'info').mockImplementation(() => {})
    jest.spyOn(logger, 'error').mockImplementation(() => {})
  })

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

  test('should return a correct card', async () => {
    const encryptedCard = await sut.execute(cardId)
    expect(encryptedCard).toEqual({ encryptedCard: 'anyEncryptedCard' })
  })
})
