FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy backend code
COPY . .

# Install pip + dependencies
RUN pip install --upgrade pip \
 && pip install torch==2.2.2+cpu --extra-index-url https://download.pytorch.org/whl/cpu \
 && pip install -r requirements.txt

# Expose port expected by Fly.io
EXPOSE 8000
CMD ["python", "app.py"]  # or "wsgi:app" depending on setup
