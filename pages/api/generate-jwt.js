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

  // Vervang literal "\n" door echte nieuwe regels in de PEM-sleutel
  let privateKey = COINBASE_PRIVATE_KEY
  if (privateKey.includes('\n')) {
    privateKey = privateKey.replace(/\n/g, '
')
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

  try {
    // Gebruik ES256 voor EC private keys
    const token = jwt.sign(payload, privateKey, {
      algorithm: 'ES256',
      header: { kid: COINBASE_KEY_ID }
    })
    return res.status(200).json({ token })
  } catch (error) {
    console.error('JWT sign error:', error)
    return res.status(500).json({ error: 'Kon JWT niet genereren.' })
  }
}
