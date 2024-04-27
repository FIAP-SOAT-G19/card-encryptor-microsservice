import { SaveCardGatewayInterface } from '@/adapters/gateways/save-card/save-card.gateway.interface'
import { SaveCardUseCase } from './save-card.usecase'
import { Cryptodapter } from '@/adapters/tools/crypto/crypto.adapter'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { InvalidParamError } from '@/shared/errors'

const gateway = mock<SaveCardGatewayInterface>()
const crypto = mock<Cryptodapter>()

describe('SaveCardUseCaseInterface', () => {
  let sut: SaveCardUseCase
  let encryptedCard: string

  beforeEach(() => {
    sut = new SaveCardUseCase(gateway, crypto)
    encryptedCard = 'anyEncryptedCard'

    crypto.generateUUID.mockReturnValue('AnyId')
    gateway.saveCard.mockResolvedValue('AnyId')
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if encryptedCard is not provided', async () => {
    await expect(sut.execute('')).rejects.toThrow(new InvalidParamError('encryptedCard'))
  })

  test('should call gateway.saveCard once and with correct values', async () => {
    await sut.execute(encryptedCard)

    expect(gateway.saveCard).toHaveBeenCalledTimes(1)
    expect(gateway.saveCard).toHaveBeenCalledWith({
      id: 'AnyId',
      encryptedCard: 'anyEncryptedCard',
      createdAt: new Date()
    })
  })

  test('should return a cardId on success', async () => {
    const output = await sut.execute(encryptedCard)
    expect(output).toBe('AnyId')
  })
})
