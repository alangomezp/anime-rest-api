import express from 'express'
import { AnimesController } from '../controllers/animes-controller.js'

const animesRouter = express.Router()

animesRouter.get('/', AnimesController.getAll)
  .post('/', AnimesController.create)

animesRouter.get('/:id', AnimesController.getById)
  .patch('/:id', AnimesController.update)
  .delete('/:id', AnimesController.delete)

export default animesRouter
