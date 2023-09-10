# Encrypted Time-Series Backend Application

This backend application generates and emits encrypted data streams over a socket, listens to incoming data streams, decrypts and decodes them, and saves the data to a time-series MongoDB database. The saved data is then emitted to a frontend application in real-time.

## Table of Contents
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Getting Started](#GettingStarted)
- [Emitter Service](#emitter-service)
- [Listener Service](#listener-service)
- [Frontend](#frontend)
- [MongoDB Database](#mongodb-database)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js
- MongoDB
- WebSocket library (e.g., `socket.io`)

## Installation

1. Clone the repository:

   ```shell
   git clonehttps://github.com/jainabhishek-Full-Stack-Developer/encrypted-timeseries.git
## Getting Started

To get started with this project, follow these steps:



### Frontend Application

1. Navigate to the frontend-app folder:
    ```shell
    cd frontend-app
    ```

2. Start the frontend application:
    ```shell
    npm start
    ```

### Server

1. Navigate to the root folder of the server:
    ```shell
    cd server-folder
    ```

2. Install the required dependencies:
    ```shell
    npm install
    ```

3. Start the server:
    ```shell
    npm run dev
    ```

These prerequisites and steps will help you set up and run the project successfully. Make sure you have the mentioned dependencies installed before proceeding with the setup.
## Emitter Service

The Emitter Service is responsible for generating and emitting encrypted data streams. It performs the following tasks:

- Generates a periodic data stream of encrypted messages with randomized values for `name`, `origin`, and `destination`.
- Calculates the `secret_key` as the SHA-256 hash of the message object.
- Encrypts the payload using the `aes-256-ctr` algorithm with a passphrase.
- Sends the encrypted message stream over a socket to the Listener Service.
- Periodically sends data streams every 10 seconds.

## Listener Service

The Listener Service allows an emitter to connect to it via sockets. It performs the following tasks:

- Listens for incoming data streams from the emitter.
- Decrypts the received data using the `aes-256-ctr` algorithm with the correct passphrase.
- Verifies the data integrity using the `secret_key`.
- Discards data if integrity is compromised.
- Adds a timestamp to the object and saves it to a MongoDB collection designed for time-series data.
- Designs the MongoDB schema to store data in minute-based time intervals.

## Frontend

The Frontend Application is a separate application that displays received data in real-time. It performs the following tasks:

- Connects to the Listener Service using a WebSocket library (e.g., `socket.io-client`) for real-time updates.
- Displays received data in a real-time manner on the frontend.
- Calculates and displays the success rate for data transmission and decoding.

## MongoDB Database

The MongoDB Database is used to store time-series data. It performs the following tasks:

- Set up a MongoDB database and create a collection for storing time-series data.
- Designs the schema to optimize performance for time-series queries, considering time-based indexing.
- Stores data in minute-based documents for efficient aggregation.

## Usage

1. Clone this repository.
2. Set up the MongoDB database and configure its connection in the Listener Service.
3. Install the required Node.js packages for both the Emitter and Listener services.
4. Start the Emitter Service and Listener Service.
5. Create a separate frontend application that connects to the Listener Service for real-time data display.



