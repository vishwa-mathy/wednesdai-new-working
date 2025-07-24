// /api/call-template.js
export default async function handler(req, res) {
    const BASE_URL_TEMPLATE = 'https://in1750257229223.my.salesforce.com';
    console.log('called');
    console.log(req.body);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    console.log('inside try');
    const response = await fetch(`${BASE_URL_TEMPLATE}/services/data/v64.0/einstein/prompt-templates/Return_Relevant_Materials/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    console.log(data);
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[call-template] Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}