// /api/send-session-message.js
export default async function handler(req, res) {
    const BASE_URL_TEMPLATE = 'https://in1750257229223.my.salesforce.com';
    console.log('called');
    console.log(req.body);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { sessionId, message } = req.body;
  if (!sessionId || !message) {
    res.status(400).json({ error: 'Missing sessionId or message' });
    return;
  }

  try {
    const response = await fetch(`https://api.salesforce.com/einstein/ai-agent/v1/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log('DATA '+JSON.stringify(data))
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}