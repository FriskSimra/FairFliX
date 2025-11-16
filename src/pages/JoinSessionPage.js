import { useState } from 'react';
import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import joinTicket from '../assets/join_session_ticket.png';
import ticketBooth from '../assets/join_session_ticketbooth.png';
import theaterImage from '../assets/session_joined_theatre.png';
import Footer from '../components/Footer';

function JoinSessionPage({ onNavigate, onBack, canGoBack, backButtonImg }) {
  const [currentView, setCurrentView] = useState('join');
  const [sessionCode, setSessionCode] = useState('');
  const [joinedSession, setJoinedSession] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Drama');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedPlatform, setSelectedPlatform] = useState('Disney+');
  const [readyUsers, setReadyUsers] = useState(3);
  const [isReady, setIsReady] = useState(false);

  const joinSession = () => {
    if (!sessionCode.trim()) {
      setErrorMessage('Please enter a session code');
      return;
    }

    const code = sessionCode.toUpperCase();
    const savedSessions = localStorage.getItem('fairflix-sessions');
    const sessions = savedSessions ? JSON.parse(savedSessions) : [];
    const session = sessions.find(s => s.code === code);

    if (session) {
      setErrorMessage('');
      setJoinedSession(session);
      setCurrentView('joined');
    } else {
      setErrorMessage(`Session code "${code}" not found. Please check the code with your host.`);
    }
  };

  const renderPollSection = () => {
    const genres = ['Action & Adventure', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Sci-Fi', 'Fantasy', 'Documentary'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Chinese', 'Portuguese'];
    const platforms = ['Netflix', 'Disney+', 'HBO Max', 'Prime Video', 'Hulu', 'Apple TV+', 'Paramount+', 'Peacock', 'YouTube'];

    return (
      <div className="polls-section">
        <div className="poll-container">
          <h3>Genres</h3>
          <p>What is the mood today?</p>
          <div className="poll-options">
            {genres.map(genre => (
              <div 
                key={genre}
                className={`poll-option ${selectedGenre === genre ? 'selected' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
        
        <div className="poll-container">
          <h3>Language</h3>
          <p>Are we speaking your language?</p>
          <div className="poll-options">
            {languages.map(language => (
              <div 
                key={language}
                className={`poll-option ${selectedLanguage === language ? 'selected' : ''}`}
                onClick={() => setSelectedLanguage(language)}
              >
                {language}
              </div>
            ))}
          </div>
        </div>
        
        <div className="poll-container">
          <h3>Where?</h3>
          <p>What streaming platform works?</p>
          <div className="poll-options">
            {platforms.map(platform => (
              <div 
                key={platform}
                className={`poll-option ${selectedPlatform === platform ? 'selected' : ''}`}
                onClick={() => setSelectedPlatform(platform)}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderJoinView = () => (
    <div className="session-container">
      <h1 className="session-title">Let's get this Started!</h1>
      <p className="join-subtitle">Enter your Host's SessionCode:</p>
      
      <div className="join-main-container">
        <div className="join-input-section">
          <div className="ticket-image-container">
            <img src={joinTicket} alt="Ticket" className="ticket-image" />
          </div>
          <input 
            type="text" 
            value={sessionCode} 
            onChange={(e) => {
              setSessionCode(e.target.value.toUpperCase());
              setErrorMessage('');
            }}
            placeholder="ABC123"
            className="session-input join-input"
            maxLength="6"
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="join-btn-form" onClick={joinSession}>JOIN</button>
        </div>
        
        <div className="ticket-booth-container">
          <img src={ticketBooth} alt="Ticket Booth" className="ticket-booth-image" />
        </div>
      </div>
      
      <div className="join-help-section">
        <h3>Never joined a session?</h3>
        <p>1. Type in an active session code sent by your host.</p>
        <p>2. Once you're in vote on genres, languages and streaming platforms.</p>
        <p>3. Click the thumbs up to tell the host you're ready!</p>
      </div>
    </div>
  );

  const renderJoinedView = () => (
    <div className="session-active-container">
      <div className="session-info-section">
        <h1 className="active-title">{joinedSession?.name}</h1>
        <p className="joined-status">Session Joined!</p>
        
        <div className="session-details-grid">
          <div className="session-info-left">
            <div className="session-info-item">
              <span className="info-label">Session ID:</span>
              <span className="info-value">{joinedSession?.id}</span>
            </div>
            <div className="session-info-item">
              <span className="info-label">Session Code:</span>
              <span className="info-value">{joinedSession?.code}</span>
            </div>
          </div>
          <div className="theater-icon-container">
            <img src={theaterImage} alt="Theater" className="theater-image" />
            <span className="theater-label"> </span>
          </div>
        </div>
      </div>
      
      <div className="section-divider"></div>
      
      {renderPollSection()}
      
      <div className="session-controls">
        <button 
          className={`thumbs-up-btn ${isReady ? 'ready' : ''}`}
          onClick={() => setIsReady(!isReady)}
        >
          👍
        </button>
        <button className="begin-selection-btn">Pick a few movies</button>
      </div>
    </div>
  );

  return (
    <div className="App create-session-page">
      <header className="header-bar">
        <div className="header-left">
          {canGoBack && (
            <button className="back-button" onClick={onBack}>
              <img src={backButtonImg} alt="Back" className="back-button-img" />
            </button>
          )}
          <img 
            src={fairflixLogo} 
            alt="FairFlix" 
            className="header-logo" 
            onClick={() => onNavigate('landing')}
          />
        </div>
      </header>
      
      <main className={`create-session-content ${currentView !== 'join' ? 'scrollable' : ''}`}>
        <div className="film-reel-container left-container">
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
        </div>
        <div className="film-reel-container right-container">
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
        </div>
        
        {currentView === 'join' && renderJoinView()}
        {currentView === 'joined' && renderJoinedView()}
      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default JoinSessionPage;