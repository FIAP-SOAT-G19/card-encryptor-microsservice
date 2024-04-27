import { SaveCardUseCaseInterface } from '@/usecases/save-card/save-card.usecase.interface'
import { ControllerInterface, HttpRequest, HttpResponse } from '../controller.interface'
import { success } from '@/shared/helpers/http.helper'
import { handleError } from '@/shared/helpers/error.helper'

export class SaveCardController implements ControllerInterface {
  constructor(private readonly saveCardUseCase: SaveCardUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const encryptedCard: string = input?.body?.encryptedCard
      const cardId = await this.saveCardUseCase.execute(encryptedCard)
      return success(201, cardId)
    } catch (error) {
      return handleError(error)
    }
  }
}
