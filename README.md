# Coinbase JWT API

Een simpele Next.js API voor het genereren van RS256-gesigneerde JWTs voor Coinbase CDP.

## Voorwaarden
- Node.js 18+
- Vercel-account

## Installatie

```bash
# Repo clonen
git clone https://github.com/jouw-gebruikersnaam/coinbase-jwt-api.git
cd coinbase-jwt-api

# Dependencies installeren
npm install
```

Maak een `.env.local` bestand (op basis van `.env.example`) en vul je Coinbase-appgegevens in:

```ini
COINBASE_APP_ID=je_app_id
COINBASE_KEY_ID=je_key_id
COINBASE_PRIVATE_KEY="...je privésleutel..."
```

## Lokaal testen

```bash
npm run dev
```
Ga naar `http://localhost:3000/api/generate-jwt` voor je JWT.

## Deploy naar Vercel

1. Push de repo naar GitHub.
2. Ga naar [Vercel](https://vercel.com) en importeer de repo.
3. Voeg in het project de environment variables toe (Settings → Environment Variables) met dezelfde namen:
   - `COINBASE_APP_ID`
   - `COINBASE_KEY_ID`
   - `COINBASE_PRIVATE_KEY`
4. Deploy (vercel --prod) of via dashboard.

Je endpoint staat dan live op:
```
https://<jouw-vercel-project>.vercel.app/api/generate-jwt
```