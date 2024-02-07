import express from 'express'
import { createAnimesRouter } from './routes/animes-route.js'
import { AnimesModel } from './models/local-filesystem/anime.js'
import cors from 'cors'

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api/animes', createAnimesRouter(AnimesModel))

// start app
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`)
})
