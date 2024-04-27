import { expressRouteAdapter } from '@/adapters/tools/express/express.adapter'
import { Router } from 'express'
import { makeSaveCardControllerFactory } from './factories/save-card-controller.factory'

const router = Router()

router.post('/card', expressRouteAdapter(makeSaveCardControllerFactory()))

export { router }
