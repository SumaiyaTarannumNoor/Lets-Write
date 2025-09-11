from .text_generator import generate_text  # your full ML logic

class TextService:
    @staticmethod
    def generate(prompt, length=300):
        # Call the existing generate_text function exactly as before
        return generate_text(prompt, length=length)
