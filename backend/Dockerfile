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
EXPOSE 8080

# Run the Flask app using gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
