import { readJSONFile } from '../../utils/utils.js'
import crypto from 'node:crypto'
const animes = readJSONFile('../models/local-filesystem/animes.json')

export class AnimesModel {
  static async getAll ({ genreName, page }) {
    const animesFiltered = []

    if (genreName) {
      for (const anime of animes) {
        if (!anime.genre.some(a => a.toLowerCase() === genreName.toLowerCase())) continue
        animesFiltered.push(anime)
      }
      return animesFiltered
    }

    if (page) {
      const start = (page * 3) - 3
      const end = start + 3
      return animes.slice(start, end)
    }

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
    return newAnime
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

    if (animeIndex === -1) return { message: 'Not Found' }

    animes.splice(animeIndex)

    return { message: 'Anime Deleted' }
  }
}
