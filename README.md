# AI Scam Detector

A modern, full-stack AI-powered application to detect scam messages using **Google Gemini AI**. Features a beautiful dark UI, cloud-ready deployment, and offline fallback detection.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- AI-Powered Analysis using **Google Gemini 2.0 Flash**
- **Offline Fallback** - Heuristic detection when API quota exceeded
- **Beautiful Dark UI** with glassmorphism effects
- **6 Demo Messages** - One-click test scenarios
- **Cloud Ready** - Deploy to Render, Railway, Heroku, Vercel, Docker
- **Risk Assessment** - Low, Medium, High risk badges
- **Real-time Analysis** - Results in seconds
- **Responsive Design** - Works on mobile and desktop

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **AI:** Google Gemini 2.0 Flash API
- **Deployment:** Render, Railway, Heroku, Vercel, Docker
- **CI/CD:** GitHub Actions

## Quick Start

### Option 1: Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/scam-detector.git
cd scam-detector

# Install backend dependencies
cd backend
npm install

# Add your Gemini API key to .env
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start server
node server.js

# Open http://localhost:5000 in browser
```

### Option 2: Standalone (No Backend)

Open `standalone.html` in any browser. Enter your API key directly in the UI.

## Demo Messages

Click any demo button to instantly test:

| Button | Type | Expected |
|--------|------|----------|
| 🏆 Lottery Scam | Scam | High Risk |
| 🏦 Bank Phishing | Scam | High Risk |
| 📦 Delivery Scam | Scam | High Risk |
| ✅ Normal Chat | Safe | Low Risk |
| ✅ Work Email | Safe | Low Risk |
| ⚠️ Free iPhone | Suspicious | Medium Risk |

## Project Structure

```
scam-detector/
├── backend/
│   ├── server.js          # Express API with Gemini integration
│   ├── package.json       # Node dependencies
│   ├── .env               # API key configuration
│   ├── Procfile           # Heroku deployment
│   ├── app.json           # Heroku app configuration
│   └── render.yaml        # Render deployment config
├── frontend/
│   ├── index.html         # Main UI with demo buttons
│   ├── styles.css         # Premium dark theme
│   ├── app.js             # Frontend logic
│   └── vercel.json        # Vercel static deployment
├── .github/workflows/     # CI/CD
│   └── deploy.yml         # GitHub Actions
├── Dockerfile             # Docker containerization
├── dockerignore           # Docker ignore rules
├── railway.json           # Railway deployment
├── vercel.json            # Vercel serverless deployment
├── DEPLOYMENT.md          # Detailed deployment guide
├── DEMO_MESSAGES.md       # All demo messages
└── README.md              # This file
```

## Cloud Deployment

### Render (Recommended)

1. Push code to GitHub
2. Connect repo to [Render](https://render.com)
3. Add `GEMINI_API_KEY` environment variable
4. Deploy automatically

**Backend URL:** `https://scam-detector-api.onrender.com`

### Railway

1. Connect GitHub repo to [Railway](https://railway.app)
2. Add `GEMINI_API_KEY` variable
3. Auto-deploys with `railway.json`

### Heroku

```bash
heroku create scam-detector-api
heroku config:set GEMINI_API_KEY=your_key
 git push heroku main
```

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t scam-detector .
docker run -p 5000:5000 -e GEMINI_API_KEY=your_key scam-detector
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## API Reference

### Health Check
```
GET /health
```

### Analyze Message
```
POST /analyze
Content-Type: application/json

{
  "message": "Your message here"
}
```

**Response:**
```json
{
  "result": {
    "verdict": "Scam",
    "reason": "Prize/lottery claims...",
    "risk": "High"
  },
  "source": "gemini-ai",
  "fallback": false
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | - | Google Gemini API key |
| `PORT` | No | 5000 | Server port |
| `GEMINI_MODEL` | No | gemini-2.0-flash | AI model name |

## How It Works

1. **User Input** - Paste or type a suspicious message
2. **Gemini AI Analysis** - Message sent to Google Gemini for analysis
3. **JSON Parsing** - AI response parsed into structured format
4. **Display Result** - Verdict, reason, and risk level shown
5. **Fallback Mode** - If API fails, built-in heuristics analyze the message

## Fallback Heuristics

When Gemini API is unavailable (quota exceeded, network issues), the app uses pattern matching:

- **Scam patterns:** Lottery claims, money amounts, urgency, phishing links
- **Safe patterns:** Meetings, greetings, casual conversation
- **Score-based:** Weighted scoring system determines risk level

## Screenshots

### Main Interface
- Dark glassmorphism theme
- Demo message buttons
- Text input area

### Result Display
- Color-coded verdict (Red/Green/Orange)
- Risk badge (Low/Medium/High)
- Detailed explanation
- AI source indicator

## Testing

```bash
# Test backend endpoint
cd backend
node test-analyze.js

# Expected output:
# Status: 200
# Response: { "verdict": "Scam", "risk": "High", ... }
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 429 Quota Exceeded | App auto-fallbacks to heuristics. Upgrade Gemini plan. |
| 404 Model Not Found | Check `GEMINI_MODEL` env var. Use `gemini-2.0-flash`. |
| CORS Errors | Backend CORS is enabled. Check frontend URL. |
| Server won't start | Check `GEMINI_API_KEY` in `.env` file. |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

- **Google Gemini AI** - AI model for scam detection
- **Express.js** - Backend framework
- **Glassmorphism Design** - Modern UI trend

---

Built with AI to detect AI-powered scams! Stay safe online.

