# Cloud Deployment Guide

## Overview

This project includes multiple deployment options for cloud hosting. The backend uses **Google Gemini AI** for scam detection with a **fallback heuristic system** when API quotas are exceeded.

---

## Prerequisites

1. **Google Gemini API Key** (Required)
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a free API key
   - Note: Free tier has rate limits (60 requests/minute)

2. **Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

---

## Option 1: Render (Recommended - Free)

### Steps:

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/scam-detector.git
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

4. **Configure Service**
   - **Name**: `scam-detector-api`
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Plan**: Free

5. **Add Environment Variables**
   - Click "Advanced" → "Add Environment Variable"
   - Key: `GEMINI_API_KEY`
   - Value: Your actual API key

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your API will be at: `https://scam-detector-api.onrender.com`

### Frontend Deployment (Render Static Site)

1. **Create Static Site**
   - Click "New +" → "Static Site"
   - Connect same repository

2. **Configure**
   - **Name**: `scam-detector`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `frontend`

3. **Deploy**
   - Your frontend will be at: `https://scam-detector.onrender.com`

---

## Option 2: Railway (Free Tier Available)

### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables**
   - Go to project settings → Variables
   - Add: `GEMINI_API_KEY` = your key

4. **Deploy**
   - Railway auto-detects `railway.json`
   - Your app deploys automatically

---

## Option 3: Heroku

### Steps:

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create scam-detector-api
   ```

4. **Set Environment Variable**
   ```bash
   heroku config:set GEMINI_API_KEY=your_api_key_here
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

---

## Option 4: Vercel (Frontend Only)

### For Frontend:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow prompts**
   - Set up and deploy
   - Your frontend will be at: `https://scam-detector.vercel.app`

### For Backend (Serverless):

1. **Deploy from root**
   ```bash
   vercel
   ```

2. **Add Environment Variable**
   ```bash
   vercel env add GEMINI_API_KEY
   ```

---

## Option 5: Docker (Any Cloud Provider)

### Build and Run Locally:

```bash
# Build image
docker build -t scam-detector .

# Run container
docker run -p 5000:5000 -e GEMINI_API_KEY=your_key_here scam-detector
```

### Deploy to Cloud:

**AWS ECS / Google Cloud Run / Azure Container Instances:**

1. Push to Docker Hub or cloud registry
2. Deploy container with environment variable `GEMINI_API_KEY`

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `PORT` | No | Server port (default: 5000) |
| `GEMINI_MODEL` | No | Model name (default: gemini-2.0-flash) |
| `NODE_ENV` | No | Environment (development/production) |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /health` | GET | Health check for monitoring |
| `POST /analyze` | POST | Analyze message for scams |

### POST /analyze Request:
```json
{
  "message": "Your message here"
}
```

### Response:
```json
{
  "result": {
    "verdict": "Scam",
    "reason": "Explanation...",
    "risk": "High"
  },
  "source": "gemini-ai",
  "fallback": false
}
```

---

## Troubleshooting

### 429 Quota Exceeded
- Free tier has limits
- App automatically falls back to heuristic detection
- Upgrade to paid plan for higher limits

### 404 Model Not Found
- Check `GEMINI_MODEL` environment variable
- Default is `gemini-2.0-flash`

### CORS Errors
- Backend already has CORS enabled
- Ensure frontend URL is correct

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Frontend  │────▶│   Backend    │────▶│  Google Gemini  │
│  (Render)   │     │   (Render)   │     │     AI API      │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                           ▼ (fallback)
                    ┌──────────────┐
                    │  Heuristics  │
                    │   (Offline)  │
                    └──────────────┘
```

---

## Free Tier Limits

| Service | Tier | Limit |
|---------|------|-------|
| Google Gemini | Free | 60 req/min |
| Render | Free | 512 MB RAM, sleeps after 15 min |
| Railway | Free | $5 credit/month |
| Heroku | Eco | $5/month |
| Vercel | Hobby | 100 GB bandwidth |

---

## Next Steps

1. ✅ Get Gemini API key
2. ✅ Choose deployment platform
3. ✅ Set environment variables
4. ✅ Deploy backend
5. ✅ Deploy frontend
6. ✅ Test with demo messages
7. ✅ Share your URL!

