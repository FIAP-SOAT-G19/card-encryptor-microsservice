import { GetCardByIdUseCaseInterface } from '../../../usecases/get-card-by-id/get-card-by-id.usecase.interface'
import { ControllerInterface, HttpRequest, HttpResponse } from '../controller.interface'
import { success } from '../../../shared/helpers/http.helper'
import { handleError } from '../../../shared/helpers/error.helper'

export class GetCardByIdController implements ControllerInterface {
  constructor(private readonly getCardByIdUseCase: GetCardByIdUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const cardId: string = input?.params?.id
      const cardEncrypted = await this.getCardByIdUseCase.execute(cardId)
      return success(200, cardEncrypted)
    } catch (error) {
      return handleError(error)
    }
  }
}
