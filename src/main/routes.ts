import { expressRouteAdapter } from '@/adapters/tools/express/express.adapter'
import { makeSaveCardControllerFactory } from './factories/save-card-controller.factory'
import { makeGetCardByIdControllerFactory } from './factories/get-card-by-id.factory'
import { Router } from 'express'
import { makeDeleteCardControllerFactory } from './factories/delete-card-controller.factory'
import { expressMiddlewareAdapter } from '@/adapters/middlewares/express-middleware.adapter'
import { makeAuthenticationMiddlewareFactory } from './factories/authentication-middleware.factory'

const router = Router()

router.post('/card', expressMiddlewareAdapter(makeAuthenticationMiddlewareFactory()), expressRouteAdapter(makeSaveCardControllerFactory()))
router.get('/card/:id', expressMiddlewareAdapter(makeAuthenticationMiddlewareFactory()), expressRouteAdapter(makeGetCardByIdControllerFactory()))
router.delete('/card/:id', expressMiddlewareAdapter(makeAuthenticationMiddlewareFactory()), expressRouteAdapter(makeDeleteCardControllerFactory()))

export { router }
