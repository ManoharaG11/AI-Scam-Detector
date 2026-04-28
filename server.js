const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend (if index.html is in same folder)
app.use(express.static(__dirname));

const PORT = process.env.PORT || 5000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

console.log("Server starting...");
console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO KEY FOUND");
console.log("Using model:", GEMINI_MODEL);

// FIX: Root route (prevents "Cannot GET /")
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        geminiConfigured: !!process.env.GEMINI_API_KEY
    });
});

// AI analysis endpoint
app.post("/analyze", async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ error: "Message required" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "API key not configured" });
    }

    try {
        const prompt = `
Analyze the message and detect scam.

Return ONLY JSON:
{
  "verdict": "Scam or Safe",
  "reason": "short explanation",
  "risk": "Low/Medium/High"
}

Message: ${message}
        `;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;

        let result;
        try {
            const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
            result = JSON.parse(jsonMatch ? jsonMatch[1] : text);
        } catch (e) {
            result = {
                verdict: "Unknown",
                reason: "Failed to parse AI response",
                risk: "Medium"
            };
        }

        res.json({ result, source: "gemini-ai" });

    } catch (err) {
        console.error("API Error:", err.message);

        const fallback = analyzeWithHeuristics(message);
        res.json({ result: fallback, fallback: true });
    }
});

// 🔍 Fallback scam detection (offline)
function analyzeWithHeuristics(message) {
    const lowerMsg = message.toLowerCase();
    let score = 0;
    let reasons = [];

    const scamPatterns = [
        { pattern: /won|winner|prize|lottery|jackpot/, weight: 3 },
        { pattern: /urgent|hurry|limited time|act now/, weight: 2 },
        { pattern: /click|http|www\./, weight: 2 },
        { pattern: /bank|otp|password|cvv/, weight: 4 },
        { pattern: /free|gift|bonus|cashback/, weight: 1 }
    ];

    for (const { pattern, weight } of scamPatterns) {
        if (pattern.test(lowerMsg)) score += weight;
    }

    let verdict = "Safe";
    let risk = "Low";

    if (score >= 5) {
        verdict = "Scam";
        risk = "High";
    } else if (score >= 3) {
        verdict = "Scam";
        risk = "Medium";
    } else if (score >= 1) {
        verdict = "Suspicious";
    }

    return {
        verdict,
        risk,
        reason: "Fallback analysis used (AI unavailable)"
    };
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
