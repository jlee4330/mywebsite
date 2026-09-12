import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url'
import { BLOG_CONFIG } from './src/config/blog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SESSION_COOKIE = 'dg_blog_session'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function getCookie(req, name) {
  const cookie = req.headers.cookie
    ?.split(';')
    .map(value => value.trim().split('='))
    .find(([key]) => key === name)
  return cookie ? decodeURIComponent(cookie.slice(1).join('=')) : null
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  const adminPassword = env.BLOG_ADMIN_PASSWORD
  const activeSessions = new Set()

  return {
    plugins: [
      react(),
      {
        name: 'blog-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            try {
              if (req.url === BLOG_CONFIG.loginEndpoint && req.method === 'POST') {
                if (!adminPassword) {
                  sendJson(res, 503, { error: 'Set BLOG_ADMIN_PASSWORD in .env.local first.' })
                  return
                }

                const data = await readJsonBody(req)
                if (data.password !== adminPassword) {
                  sendJson(res, 401, { error: 'Incorrect password. Please try again.' })
                  return
                }

                const sessionToken = randomUUID()
                activeSessions.add(sessionToken)
                res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${sessionToken}; HttpOnly; SameSite=Strict; Path=/`)
                sendJson(res, 200, { success: true })
                return
              }

              if (req.url === BLOG_CONFIG.logoutEndpoint && req.method === 'POST') {
                const sessionToken = getCookie(req, SESSION_COOKIE)
                if (sessionToken) activeSessions.delete(sessionToken)
                res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`)
                sendJson(res, 200, { success: true })
                return
              }

              if (req.url === BLOG_CONFIG.saveEndpoint && req.method === 'POST') {
                const sessionToken = getCookie(req, SESSION_COOKIE)
                if (!sessionToken || !activeSessions.has(sessionToken)) {
                  sendJson(res, 401, { error: 'Unauthorized' })
                  return
                }

                const data = await readJsonBody(req)
                const postsFilePath = path.resolve(__dirname, BLOG_CONFIG.postsFile)
                fs.writeFileSync(postsFilePath, JSON.stringify(data.posts, null, 2), 'utf-8')
                sendJson(res, 200, { success: true, count: data.posts.length })
                return
              }
            } catch (error) {
              sendJson(res, 500, { error: error.message })
              return
            }

            next()
          })
        },
      },
    ],
  }
})
