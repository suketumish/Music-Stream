# Music Player Web Application

A modern web-based music player application built with Flask and MongoDB.

## Features

- User authentication (signup/login)
- Music playback with controls
- Playlist management
- Search functionality
- Modern and responsive UI
- Audio equalizer

## Prerequisites

- Python 3.8 or higher
- MongoDB installed and running
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-player
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install the required packages:
```bash
pip install -r requirements.txt
```

4. Make sure MongoDB is running on your system:
```bash
# MongoDB should be running on localhost:27017
```

## Running the Application

1. Start the Flask application:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
music-player/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── static/               # Static files
│   ├── css/             # CSS files
│   ├── js/              # JavaScript files
│   ├── img/             # Image files
│   └── audio/           # Audio files
└── templates/           # HTML templates
    └── index.html       # Main application template
```

## Usage

1. Sign up for a new account or log in if you already have one
2. Browse the available songs in the playlist
3. Click on any song to play it
4. Use the player controls at the bottom to:
   - Play/pause
   - Skip to next/previous track
   - Adjust volume
   - Use the equalizer
   - Download songs

## Contributing

Feel free to submit issues and enhancement requests. 