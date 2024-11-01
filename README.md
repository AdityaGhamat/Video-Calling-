Video Calling Application
This is a video calling application built with PeerJS, Node.js, Express, and Vite React. The app enables real-time video and audio communication between users and utilizes PeerJS for WebRTC connections. The PeerJS server is set up using Docker to facilitate peer-to-peer connectivity.

Features
Real-Time Video & Audio Communication: Connect users in real-time using WebRTC via PeerJS.
User-Friendly UI: Built with Vite React for a responsive and efficient frontend.
Peer Server with Docker: Uses a Dockerized PeerJS server for managing peer connections.
Prerequisites
Node.js (v16+)
Docker
PeerJS (for peer-to-peer communication)
Getting Started

1. Clone the Repository
   bash
   Copy code
   git clone https://github.com/AdityaGhamat/Video-Calling-.git
   cd video-calling-app
2. Install Dependencies
   Navigate to both the server and client directories and install dependencies:

Server (Node.js + Express)
bash
Copy code
cd backend
npm install
Client (Vite React)
bash
Copy code
cd ../frontend
npm install 3. Set Up PeerJS Server with Docker
In the root directory, create a docker-compose.yml file (if not already present):

yaml
Copy code
version: '3'
services:
peerjs:
image: peerjs/peerjs-server
container_name: peerjs-server
ports: - "9000:9000"
environment: - PORT=9000 - PATH=/peerjs
Run the Docker container:

bash
Copy code
docker-compose up -d
This will start a PeerJS server on http://localhost:9000/peerjs.

4. Configure Environment Variables
   In the server folder, create a .env file for environment variables:

plaintext
Copy code
PORT=5000
PEER_SERVER=http://localhost:9000/peerjs
For the Vite React client, create an .env file in the client directory:

plaintext
Copy code
VITE_PEER_SERVER=http://localhost:9000/peerjs 5. Start the Server and Client
Start the Server (Node.js + Express)
bash
Copy code
cd server
npm start
The server will run on http://localhost:3000.

Start the Client (Vite React)
bash
Copy code
cd ../client
npm run dev
The client will run on http://localhost:5173.
