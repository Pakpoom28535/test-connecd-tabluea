Token Generation API

Overview

This is a simple Express-based API for generating JWT tokens for Tableau authentication. The API ensures secure access by requiring an authentication token.

Features

Generates JWT tokens with predefined claims.

Uses a fixed scope for authentication.

Requires an authentication token for security.

Swagger documentation included for easy API reference.

Requirements

Node.js (v14 or later)

NPM or Yarn

Installation

Clone this repository:

git clone https://github.com/your-repo/token-generation-api.git
cd token-generation-api

Install dependencies:

npm install

Create a .env file to store sensitive values securely:

SECRET_KEY=your_secret_key_here
AUTH_TOKEN=your_auth_token_here

Start the server:

npm start

API Endpoints

Generate Token

Endpoint: POST /gentoken

Description: Generates a JWT token for Tableau authentication.

Headers:

Authorization: Bearer {AUTH_TOKEN} (Required)

Body (JSON):

{
  "wurl": "https://example.com/dashboard"
}

Response (200 OK):

{
  "token": "your_generated_jwt_token"
}

Error Responses:

400 Bad Request: Missing required parameter wurl.

401 Unauthorized: Missing or incorrect authentication token.

Swagger Documentation

API documentation is available at: http://localhost:3000/api-docs

Running with Docker

Build the Docker image:

docker build -t token-api .

Run the container:

docker run -p 3000:3000 --env-file .env token-api

License

This project is licensed under the MIT License.
