// language: JavaScript, file: api/ai-proxy.js
export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        return res.status(200).send('OK');
    }

    try {
        const model = req.query.model || "gemini-3.5-flash-lite";
        const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.Aplaus_Project}`;
        
        const response = await fetch(googleUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (e) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: e.message });
    }
}
