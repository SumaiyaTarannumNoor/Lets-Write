// src/api/textGenerator.ts

const API_URL = 'http://localhost:5000/api/generate'; // Replace with the correct backend URL if needed

export const generateText = async (prompt: string, length: number): Promise<string> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, length }),
  });

  const data = await response.json();
  return data.text;
};
