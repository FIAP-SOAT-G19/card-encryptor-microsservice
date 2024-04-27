import { DeleteCardUseCaseInterface } from '@/usecases/delete-card/delete-card.usecase.interface'
import { HttpRequest, HttpResponse } from '../controller.interface'
import { success } from '@/shared/helpers/http.helper'
import { handleError } from '@/shared/helpers/error.helper'

export class DeleteCardController {
  constructor(private readonly deleteCardUseCase: DeleteCardUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const cardId: string = input?.params?.id
      await this.deleteCardUseCase.execute(cardId)
      return success(204, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
