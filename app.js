import express from 'express'
import animesRoutes from './routes/animes-route.js'

const app = express()

// middlewares
app.use(express.json())

// routes
app.use('/api/animes', animesRoutes)

// start app
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`)
})
