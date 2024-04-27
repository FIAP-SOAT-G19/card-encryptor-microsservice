import { expressRouteAdapter } from '@/adapters/tools/express/express.adapter'
import { makeSaveCardControllerFactory } from './factories/save-card-controller.factory'
import { makeGetCardByIdControllerFactory } from './factories/get-card-by-id.factory'
import { Router } from 'express'

const router = Router()

router.post('/card', expressRouteAdapter(makeSaveCardControllerFactory()))
router.get('/card/:id', expressRouteAdapter(makeGetCardByIdControllerFactory()))

export { router }
