import { DeleteCardGatewayInterface } from '@/adapters/gateways/delete-card/delete-card.gateway.interface'
import { mock } from 'jest-mock-extended'
import { DeleteCardUseCase } from './delete-card.usecase'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

const gateway = mock<DeleteCardGatewayInterface>()

describe('DeleteCardUseCase', () => {
  let sut: DeleteCardUseCase
  let cardId: string

  beforeEach(() => {
    sut = new DeleteCardUseCase(gateway)
    cardId = 'anyCardId'
    gateway.getCardByd.mockResolvedValue({ id: 'anyCardId', encryptedCard: 'anyEncryptedCard', createdAt: new Date() })
  })

  test('should call gateway.deleteCard once and with correct id', async () => {
    await sut.execute(cardId)
    expect(gateway.deleteCard).toHaveBeenCalledTimes(1)
    expect(gateway.deleteCard).toHaveBeenCalledWith('anyCardId')
  })

  test('should throw if cardId is not provided', async () => {
    await expect(sut.execute('')).rejects.toThrow(new MissingParamError('cardId'))
  })

  test('should call gateway.getCardByd once and with correct id', async () => {
    await sut.execute(cardId)
    expect(gateway.getCardByd).toHaveBeenCalledTimes(1)
    expect(gateway.getCardByd).toHaveBeenCalledWith('anyCardId')
  })

  test('should throw if a invalid cardId is provided', async () => {
    gateway.getCardByd.mockResolvedValueOnce(null)
    await expect(sut.execute('invalidCardId')).rejects.toThrow(new InvalidParamError('cardId'))
  })
})
