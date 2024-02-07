import express from 'express'
import { AnimesController } from '../controllers/animes-controller.js'

export const createAnimesRouter = (AnimesModel) => {
  const animesRouter = express.Router()
  const animesController = new AnimesController(AnimesModel)

  animesRouter.get('/', animesController.getAll)
    .post('/', animesController.create)

  animesRouter.get('/:id', animesController.getById)
    .patch('/:id', animesController.update)
    .delete('/:id', animesController.delete)

  return animesRouter
}
