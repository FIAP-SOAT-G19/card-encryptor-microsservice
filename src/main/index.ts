import '../shared/config/module-alias'
import { logger } from '@/shared/logger/logger.helper'
import { router } from './routes'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

const port = process.env.PORT ?? 3000

app.listen(port, () => { logger.info(`Server running at port ${port}`) })
