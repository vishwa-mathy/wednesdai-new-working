// /api/send-session-message.js
export default async function handler(req, res) {
    const BASE_URL_TEMPLATE = 'https://in1750257229223.my.salesforce.com';
    console.log('called');
    console.log(req.body);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const response = await fetch('https://login.salesforce.com/services/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log('DATA '+JSON.stringify(data))
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}