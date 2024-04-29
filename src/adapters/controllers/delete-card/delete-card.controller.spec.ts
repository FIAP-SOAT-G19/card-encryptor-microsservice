import { mock } from 'jest-mock-extended'
import { HttpRequest } from '../controller.interface'
import { DeleteCardController } from './delete-card.controller'
import { DeleteCardUseCaseInterface } from '@/usecases/delete-card/delete-card.usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const deleteCardUseCase = mock<DeleteCardUseCaseInterface>()

describe('DeleteCardController', () => {
  let sut: DeleteCardController
  let input: HttpRequest

  beforeEach(() => {
    sut = new DeleteCardController(deleteCardUseCase)
    input = {
      params: { id: 'anyCardId' }
    }
  })

  test('should call getCardByIdUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(deleteCardUseCase.execute).toHaveBeenCalledTimes(1)
    expect(deleteCardUseCase.execute).toHaveBeenCalledWith('anyCardId')
  })

  test('should return a correct response', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({ statusCode: 204, body: null })
  })

  test('should return a correct error if SaveCardUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    deleteCardUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
