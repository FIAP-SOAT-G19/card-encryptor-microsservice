import { mock } from 'jest-mock-extended'
import { HttpRequest } from '../controller.interface'
import { GetCardByIdController } from './get-card-by-id.controller'
import { GetCardByIdUseCaseInterface } from '@/usecases/get-card-by-id/get-card-by-id.usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const getCardByIdUseCase = mock<GetCardByIdUseCaseInterface>()

describe('GetCardByIdController', () => {
  let sut: GetCardByIdController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetCardByIdController(getCardByIdUseCase)
    input = {
      params: {
        id: 'anyCardId'
      }
    }
    getCardByIdUseCase.execute.mockResolvedValue('anyEncryptedCard')
  })

  test('should call getCardByIdUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(getCardByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCardByIdUseCase.execute).toHaveBeenCalledWith('anyCardId')
  })

  test('should return a correct response', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({ statusCode: 200, body: 'anyEncryptedCard' })
  })

  test('should return a correct error if SaveCardUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    getCardByIdUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
