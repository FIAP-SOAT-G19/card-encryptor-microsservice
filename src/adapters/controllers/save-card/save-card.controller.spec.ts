import { SaveCardUseCaseInterface } from '@/usecases/save-card/save-card.usecase.interface'
import { HttpRequest } from '../controller.interface'
import { SaveCardController } from './save-card.controller'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const saveCardUseCase = mock<SaveCardUseCaseInterface>()

describe('SaveCardController', () => {
  let sut: SaveCardController
  let input: HttpRequest

  beforeEach(() => {
    sut = new SaveCardController(saveCardUseCase)
    input = {
      body: {
        encryptedCard: 'anyEncryptedCard'
      }
    }

    saveCardUseCase.execute.mockResolvedValue('AnyCardId')
  })
  test('should call SaveCardUseCase once and with correct encryptedCard', async () => {
    await sut.execute(input)

    expect(saveCardUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveCardUseCase.execute).toHaveBeenCalledWith('anyEncryptedCard')
  })

  test('should return a correct response', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({ statusCode: 201, body: 'AnyCardId' })
  })

  test('should return a correct error if SaveCardUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    saveCardUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
