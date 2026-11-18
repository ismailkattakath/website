import type { APIRoute } from 'astro'
import { convertToJSONResume } from '@/lib/json-resume'

export const prerender = true

export const GET: APIRoute = () => {
  const jsonResume = convertToJSONResume()
  return new Response(JSON.stringify(jsonResume), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
