# This code will only work for mistralai <= 1.12.4, as for the later versions the SDK codes are updated but they conflict with client packages.
from mistralai import Mistral as MistralClient
from .base import AIPlatform

class Mistral(AIPlatform):
    def __init__(self, api_key: str, system_prompt_mistral: str = None):
        """
        Initializes the Mistral AI platform.
        Using MistralClient alias to avoid naming conflicts with the class.
        """
        self.api_key = api_key
        self.system_prompt_mistral = system_prompt_mistral
        self.client = MistralClient(api_key=api_key)

    def chat(self, prompt: str) -> str:
        """
        Sends a prompt to Mistral and returns the response content.
        """
        messages = []
        
        # Add system prompt if provided
        if self.system_prompt_mistral:
            messages.append({"role": "system", "content": self.system_prompt_mistral})
        
        # Add user prompt
        messages.append({"role": "user", "content": prompt})

        try:
            # Use .chat.complete() to avoid 'Chat object is not callable' error
            response = self.client.chat.complete(
                model="mistral-small-latest",
                messages=messages
            )

            # Access the content from the first choice
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Mistral API Error: {str(e)}")
            return f"Error: Could not get response from Mistral. {str(e)}"
