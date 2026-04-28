const axios = require('axios');

async function testGeminiAPI() {
    const API_KEY = 'AIzaSyDbKIwvXRpaLdr-k2jD4qgEstiQ1e040Fs';
    const prompt = `Analyze: "You won $1,000,000! Click here now!"
    Return ONLY JSON: {"verdict":"Scam or Safe","reason":"short explanation","risk":"Low/Medium/High"}`;

    try {
        console.log('Testing Gemini API directly...');
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { timeout: 30000 }
        );
        const text = response.data.candidates[0].content.parts[0].text;
        console.log('SUCCESS! Raw response:', text);
    } catch (err) {
        console.error('API Error:', err.response?.status, err.response?.data?.error?.message || err.message);
    }
}

testGeminiAPI();

