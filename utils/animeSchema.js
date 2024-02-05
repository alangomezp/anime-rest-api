import z from 'zod'

const animeSchema = z.object({
  title: z.string(),
  genre: z.array(z.string()),
  episodes: z.number().min(1).int(),
  rating: z.number().default(5.5),
  poster: z.string().url()
})

export function validateAnimeSchema (object) {
  return animeSchema.safeParse(object)
}

export function validatePartialAnimeSchema (object) {
  return animeSchema.partial().safeParse(object)
}
