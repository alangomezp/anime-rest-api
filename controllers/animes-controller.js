import { validateAnimeSchema, validatePartialAnimeSchema } from '../utils/animeSchema.js'

export class AnimesController {
  constructor (AnimesModel) {
    this.animesModel = AnimesModel
  }

  getAll = async (req, res) => {
    const { genre, page } = req.query
    const animes = await this.animesModel.getAll({ genreName: genre, page })
    res.json(animes)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const anime = await this.animesModel.getById({ id })

    if (!anime) return res.status(404).json({ message: 'Not Found' })

    res.json(anime)
  }

  create = async (req, res) => {
    const input = validateAnimeSchema(req.body)

    if (input.error) return res.status(422).json({ message: 'Unprocessable Entity', stackTrace: input })

    const result = await this.animesModel.create({ input: input.data })

    res.json(result)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.animesModel.delete({ id })

    if (!result) res.status(404).json({ message: 'Not Found' })

    res.json(result)
  }

  update = async (req, res) => {
    const { id } = req.params
    const input = validatePartialAnimeSchema(req.body)

    if (input.error) return res.status(422).json({ message: 'Unprocessable Entity', stackTrace: input.data })

    const result = await this.animesModel.update({ id, input: input.data })

    if (!result) return res.status(404).json({ message: 'Not Found' })

    res.json(result)
  }
}
