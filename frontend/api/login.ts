const API_BASE_URL = "http://localhost:5000/api/auth";

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data; 
};