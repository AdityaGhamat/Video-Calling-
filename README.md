Video Calling Application
This project is a video calling application built using Node.js, Express, and React (Vite). It includes a PeerJS server for handling WebRTC connections.

Table of Contents
Prerequisites

Installation

Usage

Docker Setup

License

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (v14 or higher)

Docker

Installation
Clone the repository:

bash

Copy
git clone https://github.com/your-username/video-calling-app.git
cd video-calling-app
Install the dependencies:

bash

Copy
npm install
Docker Setup
Start the PeerJS server using Docker:

bash

Copy
docker run -p 9000:9000 -d peerjs/peerjs-server --path /myapp
Usage
Start the development server:

bash

Copy
npm run dev
Open your browser and navigate to http://localhost:3000 to use the application.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

License
This project is licensed under the MIT License.
