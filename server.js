const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = process.env.PORT || 5000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

console.log("Server starting...");
console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "Yes (" + process.env.GEMINI_API_KEY.substring(0, 10) + "...)" : "NO KEY FOUND");
console.log("Using model:", GEMINI_MODEL);

// Health check endpoint for cloud deployment
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        geminiConfigured: !!process.env.GEMINI_API_KEY
    });
});

app.post("/analyze", async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ error: "Message required" });
    }

    if (!process.env.GEMINI_API_KEY) {
        console.error("ERROR: No API key found in environment");
        return res.status(500).json({ error: "API key not configured" });
    }

    try {
        const prompt = `
        Analyze the following message and detect if it is a scam.

        Return ONLY in JSON:
        {
          "verdict": "Scam or Safe",
          "reason": "short explanation",
          "risk": "Low/Medium/High"
        }

        Message: ${message}
        `;

        console.log("Sending request to Gemini API (model:", GEMINI_MODEL, ")...");

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;
        console.log("Raw AI response:", text.substring(0, 200));
        
        // Try to parse the JSON response
        let parsedResult;
        try {
            // Extract JSON from markdown code blocks if present
            const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (jsonMatch) {
                parsedResult = JSON.parse(jsonMatch[1].trim());
            } else {
                parsedResult = JSON.parse(text);
            }
        } catch (parseErr) {
            parsedResult = { 
                verdict: "Unknown", 
                reason: text, 
                risk: "Medium" 
            };
        }

        res.json({ result: parsedResult, source: "gemini-ai" });

    } catch (err) {
        console.error("Error details:", err.message);
        if (err.response) {
            console.error("API status:", err.response.status);
            console.error("API data:", JSON.stringify(err.response.data).substring(0, 500));
        }
        
        // Fallback: Use local heuristic detection when API fails
        console.log("Using fallback detection...");
        const fallbackResult = analyzeWithHeuristics(message);
        res.json({ result: fallbackResult, fallback: true });
    }
});

// Local heuristic-based scam detection (works offline)
function analyzeWithHeuristics(message) {
    const lowerMsg = message.toLowerCase();
    let score = 0;
    let reasons = [];
    
    // Scam indicators
    const scamPatterns = [
        { pattern: /won|winner|prize|lottery|jackpot/, weight: 3, reason: "Prize/lottery claims are common scam tactics" },
        { pattern: /\$[\d,]+|₹[\d,]+|rs\.?\s*[\d,]+/, weight: 2, reason: "Specific money amounts in unsolicited messages" },
        { pattern: /urgent|hurry|limited time|expires?|act now|asap/, weight: 2, reason: "Urgency pressure tactics" },
        { pattern: /click here|click below|tap here|link|http|www\./, weight: 2, reason: "Suspicious links or click requests" },
        { pattern: /bank details|account number|credit card|cvv|otp|password/, weight: 4, reason: "Requests for sensitive financial information" },
        { pattern: /processing fee|transfer fee|tax|payment required|send money/, weight: 3, reason: "Requests for upfront payments" },
        { pattern: /suspended|blocked|restricted|verify|confirm identity/, weight: 2, reason: "Account threat/verification phishing" },
        { pattern: /congratulations|selected|chosen|lucky/, weight: 2, reason: "Unsolicited reward claims" },
        { pattern: /\+\d{10,}|call now|contact us|reach out/, weight: 1, reason: "Unexpected contact requests" },
        { pattern: /free|gift|bonus|reward|cashback/, weight: 1, reason: "Too-good-to-be-true offers" }
    ];
    
    for (const { pattern, weight, reason } of scamPatterns) {
        if (pattern.test(lowerMsg)) {
            score += weight;
            if (!reasons.includes(reason)) reasons.push(reason);
        }
    }
    
    // Safe indicators (reduce score)
    const safePatterns = [
        /meeting|schedule|appointment|reminder/,
        /hello|hi\s|hey\s|thanks|thank you/,
        /see you|talk soon|let me know/
    ];
    for (const pattern of safePatterns) {
        if (pattern.test(lowerMsg)) score -= 1;
    }
    
    // Determine verdict
    let verdict, risk;
    if (score >= 5) {
        verdict = "Scam";
        risk = "High";
    } else if (score >= 3) {
        verdict = "Scam";
        risk = "Medium";
    } else if (score >= 1) {
        verdict = "Suspicious";
        risk = "Low";
    } else {
        verdict = "Safe";
        risk = "Low";
    }
    
    const reason = reasons.length > 0 
        ? reasons.join("; ") + "."
        : "No suspicious patterns detected. Message appears safe.";
    
    return { verdict, reason, risk };
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

