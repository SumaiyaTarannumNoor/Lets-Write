from groq import Groq
from .base import AIPlatform

class GroqAI(AIPlatform):
    def __init__(self, api_key:str, system_prompt_goq: str = None):
        self.api_key = api_key
        self.system_prompt_groq = self.system_prompt_groq
        self.client = Groq(api_key=self.api_key)

        self.model_name = "llama-3.3-70b-versatile"

    def chat(self, prompt:str) -> str:
        messages = []

        if self.system_prompt_groq:
            messages.append({
                "role": "system",
                "content": self.system_prompt_groq
            })   

        messages,append({
            "role": "user",
            "content": prompt
        })

        try:
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages 
            )

            return response.choices[0].message.content.srip()
        
        except Exception as e:
            return f"Groq Error: {str(e)}"