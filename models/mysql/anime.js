import mysql from 'mysql2/promise'

const LOCAL_CONNECTION = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'animedb',
  port: 3306
}

const mysqlConnection = await mysql.createConnection(LOCAL_CONNECTION)

export class AnimesModel {
  static async getAll ({ genreName }) {
    if (genreName) {
      const [genre] = await mysqlConnection.query('SELECT id FROM genres WHERE name = ?;', [genreName])

      if (!genre.length) return [{ message: 'Not Found' }]

      const animes = []
      const [animesByGenre] = await mysqlConnection.query('SELECT BIN_TO_UUID(anime_id) as id FROM anime_genres WHERE genre_id = ?;', [genre[0].id])

      await Promise.all(
        animesByGenre.map(async (anime) => {
          const [animeData] = await mysqlConnection.query('SELECT BIN_TO_UUID(id) as id,title,episodes,rating,poster FROM anime WHERE id = UUID_TO_BIN(?);', [anime.id])
          animes.push(animeData[0])
        }))

      return animes
    }

    const [animes] = await mysqlConnection.query('SELECT BIN_TO_UUID(id) as id,title,episodes,rating,poster FROM anime;')

    return animes
  }

  static async getById ({ id }) {
    const [anime] = await mysqlConnection.query('SELECT BIN_TO_UUID(id) as id,title, episodes, rating, poster FROM anime WHERE id = UUID_TO_BIN(?);', [id])

    return anime[0]
  }

  static async create ({ input }) {
    const { title, episodes, rating, poster } = input

    const [newId] = await mysqlConnection.query('SELECT UUID() as id;')
    try {
      const [result] = await mysqlConnection.query('INSERT INTO anime (id, title, episodes, rating, poster) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);', [newId[0].id, title, episodes, rating, poster])
      if (result.affectedRows === 0) return { message: 'Error creating anime' }

      const [newAnime] = await mysqlConnection.query('SELECT BIN_TO_UUID(id) as id, title, episodes, rating, poster FROM anime WHERE id = UUID_TO_BIN(?);', [newId[0].id])
      return newAnime[0]
    } catch (error) {
      throw new Error('Error creating anime')
    }
  }

  static async update ({ id, input }) {
    const { title, episodes, rating, poster } = input

    try {
      const [result] = await mysqlConnection.query('UPDATE anime SET title = IFNULL(?, title), episodes = IFNULL(?, episodes), rating = IFNULL(?, rating), poster = IFNULL(?, poster) WHERE id = UUID_TO_BIN(?);', [title, episodes, rating, poster, id])
      if (result.affectedRows === 0) return { message: 'Not Found' }

      const [updatedAnime] = await mysqlConnection.query('SELECT BIN_TO_UUID(id) as id, title, episodes, rating, poster FROM anime WHERE id = UUID_TO_BIN(?);', [id])
      return updatedAnime[0]
    } catch (error) {
      console.log(error)
      throw new Error('Error updating anime')
    }
  }

  static async delete ({ id }) {
    try {
      const [result] = await mysqlConnection.query('DELETE FROM anime WHERE id = UUID_TO_BIN(?);', [id])
      if (result.affectedRows === 0) return { message: 'Not Found' }

      return { message: 'Anime Deleted' }
    } catch (error) {
      throw new Error('Error deleting anime')
    }
  }
}
