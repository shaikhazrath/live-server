# Live Streaming App

Welcome to the Live Streaming App project! This application leverages Real-Time Messaging Protocol (RTMP), FFmpeg, and Node.js to create a scalable and robust live streaming solution.

## Project Overview

The app is designed to provide a reliable way to stream audio, video, and data over the internet. It includes a complete architecture for ingesting, processing, and delivering live streams.

### Key Components

- **NodeMediaServer**: Manages RTMP streams.
- **FFmpeg**: Handles encoding and transcoding tasks.
- **Express Server**: Serves static files and manages socket connections.
- **Socket.io**: Facilitates real-time, bi-directional communication between clients and server.
- **Docker**: Containerizes the application for easy deployment and scalability.

## Getting Started

### Prerequisites

- Node.js
- Docker
- FFmpeg

### Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-username/live-streaming-app.git
   cd live-streaming-app
   ```
2. **Build Docker Containers:**

   ```sh
   docker-compose up --build
   ```
3. **Running Nextjs frontend:**

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

### Configuration

The configuration for NodeMediaServer, Express, and Socket.io is included in the repository. Adjust the settings in the configuration files as needed.

### Running the App

1. **Start the Media Server:**

   ```sh
   node index.js
   ```

2. **Run the Express Server:**

   ```sh
   node server.js
   ```

3. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000` to access the live streaming app.

## Docker Configuration

The Docker setup includes services for the media server and the streaming server, configured to run in isolated containers for consistency and ease of deployment.

## Contributions

Feel free to fork the repository and submit pull requests. Contributions, issues, and feature requests are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
