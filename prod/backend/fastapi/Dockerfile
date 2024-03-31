# Start with the official Python 3.9 image
FROM python:3.9

# Set the working directory to /app
WORKDIR /app

# large install, best to be in separate layer that is cached locally
RUN pip install --no-cache-dir openai-whisper

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Set the environment variable to specify the port number that the application should listen on
ENV PORT 8000

# Expose the port
EXPOSE $PORT

# Start the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
