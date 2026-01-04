
/**
 * Utsifu Sovereign n8n Gateway
 * This service is strictly synced with the n8n Webhook configuration:
 * Method: POST
 * URL: https://513c21ae5960.ngrok-free.app/webhook-test/54ddc2ed-21e3-45e1-a83a-b292f14dc335
 */

const N8N_CONFIG = {
  // Exact Test URL from your n8n screenshot
  WEBHOOK_URL: "https://513c21ae5960.ngrok-free.app/webhook-test/54ddc2ed-21e3-45e1-a83a-b292f14dc335",
  API_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNGZhY2I2My1hNTYxLTQwOTMtOGIxYi05OGI0MWFjODBiYTUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY3NTA5OTI1LCJleHAiOjE3NjgxMDc2MDB9.L45Wvu05f4Xj4R6PjJY1bgfJ8TWMZ4QUU4UyIZd4Jr8'
};

/**
 * Standard POST Fetcher for n8n Webhooks.
 * Sends data as a JSON body.
 * 
 * NOTE: Ensure you have clicked "Listen for test event" in n8n before sending.
 */
async function callN8n(payload: any) {
  try {
    // We add the ngrok-skip-browser-warning header because ngrok shows a warning page
    // by default which blocks JSON fetches from working.
    const response = await fetch(N8N_CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true', // CRITICAL: Fixes "Failed to fetch" on ngrok
        'X-N8N-API-KEY': N8N_CONFIG.API_KEY 
      },
      body: JSON.stringify({
        ...payload,
        source: "utsifu_web_v2",
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[n8n] Server responded with error ${response.status}:`, errorText);
      throw new Error(`HTTP_${response.status}`);
    }

    const data = await response.json();
    console.debug("[n8n] Uplink Successful:", data);
    return data;
  } catch (err) {
    console.error("[n8n] Connection Error:", err);
    // If it's a TypeError "Failed to fetch", it's likely a CORS issue or the ngrok tunnel is down.
    throw err;
  }
}

/**
 * Generates Automation Ideas.
 * Expected return: Array of {title, description, difficulty}
 */
export const generateMagicIdeas = async (businessType: string) => {
  try {
    const rawData = await callN8n({ 
      action: 'generate_ideas', 
      businessType,
      prompt: `Generate 3 AI automation ideas for a ${businessType} business.`
    });

    // Handle standard n8n output formats
    if (Array.isArray(rawData)) return rawData;
    
    // Check common keys n8n AI nodes use
    const dataKeys = ['output', 'data', 'ideas', 'result', 'suggestions', 'response'];
    for (const key of dataKeys) {
      if (rawData[key] && Array.isArray(rawData[key])) return rawData[key];
    }

    // Try parsing stringified JSON output
    const content = rawData.output || rawData.text || rawData.message || (typeof rawData === 'string' ? rawData : '');
    if (typeof content === 'string' && content.includes('[')) {
      try {
        const start = content.indexOf('[');
        const end = content.lastIndexOf(']') + 1;
        const parsed = JSON.parse(content.substring(start, end));
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }

    return [{
      title: "Strategy Insight",
      description: typeof content === 'string' ? content : "Workflow connected. Ensure your n8n node returns an array of ideas.",
      difficulty: "Medium"
    }];
  } catch (error) {
    console.error("Magic Tool Failure:", error);
    throw error;
  }
};

/**
 * Chatbot Interaction.
 */
export const sendChatMessage = async (message: string) => {
  try {
    const rawData = await callN8n({ action: 'chat', message });
    
    if (typeof rawData === 'string') return rawData;
    
    // If n8n returns an array (common), take the first item's output
    if (Array.isArray(rawData)) {
      const item = rawData[0];
      return item.output || item.text || item.message || JSON.stringify(item);
    }
    
    // Handle object response
    return rawData.output || rawData.text || rawData.message || rawData.response || rawData.result || JSON.stringify(rawData);
  } catch (error) {
    console.error("Chat failure:", error);
    throw error;
  }
};

/**
 * Lead Submission.
 */
export const submitContactForm = async (formData: any) => {
  return await callN8n({ action: 'contact_submission', ...formData });
};
