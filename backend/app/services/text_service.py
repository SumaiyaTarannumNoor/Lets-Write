from .text_generator import generate_text  # your ML logic

class TextService:
    @staticmethod
    def generate(prompt, length=300):
        return generate_text(prompt, length=length)
