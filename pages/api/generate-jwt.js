import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

export default function handler(req, res) {
  const {
    COINBASE_APP_ID,
    COINBASE_KEY_ID,
    COINBASE_PRIVATE_KEY
  } = process.env

  if (!COINBASE_APP_ID || !COINBASE_KEY_ID || !COINBASE_PRIVATE_KEY) {
    return res.status(500).json({ error: 'Env vars ontbreken.' })
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: COINBASE_APP_ID,
    sub: COINBASE_APP_ID,
    aud: 'https://api.coinbase.com',
    iat: now,
    exp: now + 60,
    jti: uuidv4()
  }

  const token = jwt.sign(payload, COINBASE_PRIVATE_KEY, {
    algorithm: 'RS256',
    header: { kid: COINBASE_KEY_ID }
  })

  res.status(200).json({ token })
}
