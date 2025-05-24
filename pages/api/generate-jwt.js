// pages/api/generate-jwt.js
import { sign } from 'jsonwebtoken'
import crypto from 'crypto'

export default function handler(req, res) {
  // 1) Lees je Vercel-env-vars
  const keyName   = process.env.KEY_NAME
  let   keySecret = process.env.KEY_SECRET

  if (!keyName || !keySecret) {
    return res
      .status(500)
      .json({ error: 'KEY_NAME of KEY_SECRET niet ingesteld in env.' })
  }

  // 2) Vervang literal "\n" door echte newlines (als je ze zo hebt ingevoerd)
  keySecret = keySecret.replace(/\\n/g, '\n')

  // 3) Bouw je JWT-payload en header
  const now = Math.floor(Date.now() / 1000)
  const uri = `GET api.coinbase.com/api/v3/brokerage/accounts`

  const payload = {
    iss: 'cdp',
    nbf: now,
    exp: now + 120,
    sub: keyName,
    uri
  }

  const header = {
    alg: 'ES256',
    kid: keyName,
    nonce: crypto.randomBytes(16).toString('hex')
  }

  try {
    const token = sign(payload, keySecret, { algorithm: 'ES256', header })
    return res.status(200).json({ token })
  } catch (err) {
    console.error('JWT sign error:', err)
    return res.status(500).json({ error: 'Kon JWT niet genereren.' })
  }
}
