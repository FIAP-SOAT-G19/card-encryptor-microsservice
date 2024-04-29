import { expressRouteAdapter } from '@/adapters/tools/express/express.adapter'
import { makeSaveCardControllerFactory } from './factories/save-card-controller.factory'
import { makeGetCardByIdControllerFactory } from './factories/get-card-by-id.factory'
import { Router } from 'express'
import { makeDeleteCardControllerFactory } from './factories/delete-card-controller.factory'

const router = Router()

router.post('/card', expressRouteAdapter(makeSaveCardControllerFactory()))
router.get('/card/:id', expressRouteAdapter(makeGetCardByIdControllerFactory()))
router.delete('/card/:id', expressRouteAdapter(makeDeleteCardControllerFactory()))

export { router }
