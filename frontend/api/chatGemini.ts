const API_URL = 'http://localhost:5000/api/chat-gemini';

export const chatGemini = async (prompt: string): Promise<string> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.response;
};