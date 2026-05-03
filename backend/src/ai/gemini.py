from google import genai
from .base import AIPlatform


class Gemini(AIPlatform):
    def __init__(self, api_key: str, system_prompt_gemini: str = None):
        self.api_key = api_key
        self.system_prompt_gemini = system_prompt_gemini

        self.client = genai.Client(api_key=self.api_key)

        self.model_name = "gemini-3.1-pro-preview"

    def chat(self, prompt: str) -> str:
        if self.system_prompt_gemini:
            prompt = f"{self.system_prompt_gemini}\n\n{prompt}"

        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt
        )

        return " ".join(response.text.split())