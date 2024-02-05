import { readJSONFile } from '../utils/utils.js'
import crypto from 'node:crypto'
const animes = readJSONFile('../models/data/animes.json')

export class AnimesModel {
  static async getAll () {
    return await animes
  }

  static async getById ({ id }) {
    const animeIndex = animes.findIndex(anime => anime.id === id)

    if (animeIndex === -1) return false

    return animes[animeIndex]
  }

  static async create ({ input }) {
    const newAnime = {
      id: crypto.randomUUID(),
      ...input
    }

    animes.push(newAnime)
  }

  static async update ({ id, input }) {
    const animeIndex = animes.findIndex(anime => anime.id === id)

    if (animeIndex === -1) return false

    const animeUpdate = {
      ...animes[animeIndex],
      ...input
    }

    animes[animeIndex] = animeUpdate

    return animes[animeIndex]
  }

  static async delete ({ id }) {
    const animeIndex = animes.findIndex(anime => anime.id === id)

    if (animeIndex === -1) return false

    animes.splice(animeIndex)

    return true
  }
}
