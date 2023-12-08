# Reddit Viewer App

This project is a React and Redux-based application that leverages the Reddit API to allow users to view posts and comments from the Reddit platform.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Redux Architecture](#redux-architecture)
- [API Integration](#api-integration)

## Features

1. **View Posts:** Browse through a list of posts fetched from the Reddit API.
2. **View Comments:** Access and read comments associated with each post.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/reddit-viewer-app.git

   ```

2. Navigate to the project directory:

   ```bash
   cd reddit-viewer-app

   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to https://localhost:3000 to view the application.

## Technologies Used

- React
- Redux
- Reddit API

## Redux Architecture

The application uses Redux for state management, with separate folders for actions and reducers. Actions define the actions that can be performed, and reducers specify how the application's state changes in response to these actions.

## API Integration

The Reddit API is utilized to fetch posts and comments.
