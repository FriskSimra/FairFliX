# FairFlix 🎬

**Your new hub for agreeing on what to watch**

FairFlix is a collaborative movie selection platform that helps groups decide what to watch together through interactive voting sessions. Create or join sessions, set preferences, and vote on movies using an intuitive swipe-based interface.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Starting the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend runs on: `http://localhost:3001`

2. **Start the Frontend (in a new terminal)**
   ```bash
   npm install
   npm start
   ```
   Frontend runs on: `http://localhost:3000`

## 📱 Page Functionality

### **Landing Page**
- Welcome screen with FairFlix branding
- Two main options: "Create a Session" or "Join a Session"
- Footer with navigation to About and Login pages

### **Create Session Page**
- **Host New Session**: Create a new movie night session with custom name
- **Host Existing Session**: Resume a previous session using session code
- **Session Management**: Generate 6-character codes, QR codes, and shareable links
- **Preference Setting**: Vote on genres, languages, and streaming platforms
- **Session History**: View and reuse previous sessions

### **Join Session Page**
- Enter session code to join existing movie nights
- Ticket booth themed interface
- Session validation and error handling

### **Movie Selection Page**
- Curated movie recommendations based on session preferences
- Filter by genre, language, and streaming platform
- Movie details including ratings, duration, and descriptions
- Select movies to add to voting pool

### **Voting Page**
- **Swipe Interface**: Swipe right to like, left to dislike movies
- **Button Controls**: Alternative voting using ♥ and ✕ buttons
- **Trailer Integration**: Watch movie trailers before voting
- **Progress Tracking**: See voting progress (X of Y movies)
- **Card Stack**: Visual stack of upcoming movies to vote on

### **Voting Results Page**
- Display final movie selection based on group votes
- Show voting statistics and winner
- Options to start new session or return to main menu

### **About Page**
- Information about FairFlix platform
- How-to guide and features overview

### **Login/Signup Pages**
- User authentication (UI ready, backend integration pending)
- Social media login options

## 🛠 Technical Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Create React App** - Development environment
- **QRCode Library** - QR code generation for session sharing
- **Custom CSS** - Responsive design with movie theater theming

### Backend
- **Node.js & Express** - RESTful API server
- **CORS** - Cross-origin resource sharing
- **File-based Storage** - JSON files for sessions and movies
- **Session Management** - Create, join, and manage movie sessions

## 📊 API Endpoints

- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/:code` - Get session by code
- `PUT /api/sessions/:code/preferences` - Update session preferences
- `GET /api/movies` - Get all movies
- `GET /api/movies/curated/:sessionCode` - Get filtered movies for session

## 🎯 Key Features

- **Session-based Collaboration**: Create rooms for group movie selection
- **Smart Filtering**: Movies curated based on group preferences
- **Interactive Voting**: Tinder-style swipe interface for movie selection
- **Real-time Updates**: Session preferences update in real-time
- **Mobile-Friendly**: Responsive design works on all devices
- **QR Code Sharing**: Easy session joining via QR codes
- **Movie Database**: 20+ movies with detailed information and trailers

## 🎨 Design Features

- Movie theater themed UI with film reels and popcorn imagery
- Smooth animations and transitions
- Drag-and-drop voting interface
- Visual feedback for user interactions
- Responsive layout for desktop and mobile

## 📁 Project Structure

```
fairflix/
├── backend/           # Express.js API server
│   ├── server.js      # Main server file
│   ├── movies.json    # Movie database
│   └── sessions.json  # Session storage
├── src/
│   ├── pages/         # React page components
│   ├── components/    # Reusable components
│   ├── services/      # API service functions
│   └── assets/        # Images and static files
└── public/            # Static assets
```

## 🔧 Development Scripts

### Frontend
- `npm start` - Start development server (port 3000)
- `npm test` - Run test suite
- `npm run build` - Build for production

### Backend
- `npm start` - Start production server (port 3001)
- `npm run dev` - Start with nodemon for development

## 🚧 Future Enhancements

- Real-time WebSocket integration for live voting
- User authentication and profiles
- Advanced movie filtering and search
- Integration with streaming service APIs
- Mobile app development
- Social features and movie reviews