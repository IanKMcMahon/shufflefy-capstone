# Shufflefy

## Project Overview
Shufflefy is a web application designed to enhance the Spotify playlist management experience by providing users with the ability to shuffle and remove songs from their existing Spotify playlists. This project addresses common frustrations with Spotify’s built-in shuffle algorithm, aiming to offer a more random and user-friendly shuffling experience.

## Tech Stack
- Front-End: React
- Back-End: Node.js, Express
- Database: PostgreSQL (using Sequelize ORM)
- Authentication: Spotify OAuth

## Project Focus
The primary focus of this project is on the user interface (UI), ensuring a seamless and intuitive user experience. The back-end server plays a crucial role in managing data interactions and ensuring smooth operation.

## Project Goals
- Provide users with a tool to shuffle and remove songs from their Spotify playlists.
- Enhance user satisfaction by offering a truly random shuffle experience.
- Demonstrate proficiency in full-stack web development using React, Node.js, Express, and Sequelize.

## Target Users
Spotify users who enjoy listening to their playlists on shuffle and have experienced dissatisfaction with Spotify’s shuffle algorithm.

## Data Usage and Collection
All data is sourced from Spotify’s Web API ('https://api.spotify.com/'), providing comprehensive access to users’ playlists for a personalized experience.

## Features
- List and shuffle songs within a user’s playlist.
- Allow bulk deletion of songs.
- Update the playlist on Spotify’s server.
- Future enhancements may include adding songs, playing music directly within the app, and integrating with other music services.

## User Flow
- Landing Page: Users are greeted with a welcome message and a "Get Started" button.
- Authentication: Users log in via Spotify’s OAuth.
- Dashboard: After authentication, users are redirected to a dashboard listing their playlists.
- Playlist Editing: Users select a playlist and are navigated to an editing page to shuffle, delete, and save changes.
- Navigation: Users can navigate to different sections of the app using navigation components.

## Installation and Setup
### Prerequisites
- Node.js
- PostgreSQL
- Spotify Developer Account

### Backend Setup
1. Clone the repository:


`git clone <repository-url>`

`cd shufflefy`

2. Install dependencies:

<cd backend>
<npm install>

3. Configure Environment Variables:
Create a .env file in the backend directory with the following content:

<SPOTIFY_CLIENT_ID=<your-spotify-client-id>>
<SPOTIFY_CLIENT_SECRET=<your-spotify-client-secret>>
<SPOTIFY_REDIRECT_URI=<your-spotify-redirect-uri>>
<DATABASE_URL=postgres://<username>:<password>@localhost:5432/shufflefy>

4. Setup Sequelize:


<npx sequelize-cli db:create
npx sequelize-cli db:migrate>

5. Start the backend server:

<npm start>

### Frontend Setup

1. Install dependencies:

<cd frontend
npm install>

2. Start the frontend server:

<npm start>

### Running the Application

1. Ensure PostgreSQL is running.
2. Start the backend server.
3. Start the frontend server.
4. Open your browser and navigate to http://localhost:3000.

## Future Enhancements
- Adding songs to playlists using Spotify’s search API.
- Playing music within the app using Spotify’s Playback API.
- Integrating with other music services like Apple Music for playlist migration.
- Detailed playback statistics and real-time analytics.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
_________________________________________________________________________________

By focusing on both functional and aesthetic aspects, Shufflefy aims to create a product that offers significant utility and enjoyment to Spotify users.






