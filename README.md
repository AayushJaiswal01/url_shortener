# URL Shortener Backend

A simple URL shortener service built using **Node.js, Express, Prisma, PostgreSQL, and Redis**.

## Features
- Shorten long URLs and generate unique short codes
- Redirect users to the original URL using short codes
- Ensure uniqueness: The same long URL always generates the same short code
- Track the number of times a short link is used
- Supports custom aliases

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (via Prisma ORM)
- **Cache:** Redis
- **Deployment:** Render (Backend), Vercel (Frontend)

## Installation & Setup
### Prerequisites
- Node.js & npm
- PostgreSQL
- Redis
- Prisma CLI (`npm install -g prisma`)

### Clone the repository
```sh
git clone https://github.com/your-username/url-shortener.git
cd url-shortener/backend
```

### Install dependencies
```sh
npm install
```

### Set up environment variables
Create a `.env` file in the `backend/` directory with the following:
```ini
DATABASE_URL=postgresql://user:password@localhost:5432/url_shortener
REDIS_URL=redis://localhost:6379
PORT=3000
```

### Initialize Prisma
```sh
npx prisma migrate dev --name init
```

### Start the server
```sh
npm start
```

## API Endpoints & Testing with cURL

### 1. Shorten a URL
**Request:**
```sh
curl -X POST https://url-shortener-6g8t.onrender.com/shorten \
     -H "Content-Type: application/json" \
     -d '{"long_url": "https://example.com"}'
```
**Response:**
```json
{
  "shortUrl": "https://url-shortener-6g8t.onrender.com/xrA7gG"
}
```

### 2. Redirect to Original URL
**Request:**
```sh
curl -i https://url-shortener-6g8t.onrender.com/xrA7gG
```
**Response:**
```http
HTTP/2 301
Location: https://example.com
```

### 3. Shorten with Custom Alias
**Request:**
```sh
curl -X POST https://url-shortener-6g8t.onrender.com/shorten?alias=mycustomname \
     -H "Content-Type: application/json" \
     -d '{"long_url": "https://google.com"}'
```
**Response:**
```json
{
  "shortUrl": "https://url-shortener-6g8t.onrender.com/mycustomname"
}
```

### 4. Get Click Statistics
**Request:**
```sh
curl -X GET https://url-shortener-6g8t.onrender.com/stats/xrA7gG
```
**Response:**
```json
{
  "shortUrl": "https://url-shortener-6g8t.onrender.com/xrA7gG",
  "longUrl": "https://example.com",
  "clicks": 5
}
```


