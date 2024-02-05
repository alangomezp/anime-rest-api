import { AnimesModel } from '../models/anime.js'
import { validateAnimeSchema, validatePartialAnimeSchema } from '../utils/animeSchema.js'

export class AnimesController {
  static async getAll (req, res) {
    const animes = await AnimesModel.getAll()
    res.json(animes)
  }

  static async getById (req, res) {
    const { id } = req.params
    const anime = await AnimesModel.getById({ id })

    if (!anime) return res.status(404).json({ message: 'Not Found' })

    res.json(anime)
  }

  static async create (req, res) {
    const input = validateAnimeSchema(req.body)

    if (input.error) return res.status(422).json({ message: 'Unprocessable Entity', stackTrace: input })

    await AnimesModel.create({ input })

    res.json(input)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await AnimesModel.delete({ id })

    if (!result) res.status(404).json({ message: 'Not Found' })

    res.json({ message: 'Anime Deleted' })
  }

  static async update (req, res) {
    const { id } = req.params
    const input = validatePartialAnimeSchema(req.body)

    if (input.error) return res.status(422).json({ message: 'Unprocessable Entity', stackTrace: input.data })

    const result = await AnimesModel.update({ id, input: input.data })

    if (!result) return res.status(404).json({ message: 'Not Found' })

    res.json(result)
  }
}
