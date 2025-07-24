// /api/create-session.js
export default async function handler(req, res) {
  const BASE_URL = "https://api.salesforce.com/einstein/ai-agent/v1";
  console.log("called");
  console.log(req.body);
  try {
    const { topic } = req.body;
    console.log(topic);
    const agentId = getAgentIdByCondition(topic);

    const body = JSON.stringify({
      externalSessionKey: "AgentAPIDEMO",
      instanceConfig: {
        endpoint: "https://in1750257229223.my.salesforce.com",
      },
      featureSupport: "Streaming",
      streamingCapabilities: {
        chunkTypes: ["Text"],
      },
      bypassUser: true,
    });

    const response = await fetch(`${BASE_URL}/agents/${agentId}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`,
      },
      body: body,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("[create-session] Error:", err);
    res.status(500).json({ error: "Failed to create session" });
  }

  // Helper: determine agent ID based on condition
  function getAgentIdByCondition(condition) {
    if (condition === "WednesdAI") {
      return "0XxHo0000011WKrKAM";
    } else if (condition === "cafe") {
      return "0XxHo0000011VDGKA2";
    } else if (condition === "Product Configuration") {
      return "0XxHo0000011ZwFKAU";
    }
  }
}
