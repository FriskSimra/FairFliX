import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { sessionAPI, updateSessionPreferences } from '../services/api';
import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import actionBoxFull from '../assets/actionbox_full.png';
import popcornBucket from '../assets/popcorn_bucket.png';
import Footer from '../components/Footer';
import Notification from '../components/Notification';

function CreateSessionPage({ onNavigate, onBack, canGoBack, backButtonImg, isLoggedIn, onSignout }) {
  const [currentView, setCurrentView] = useState('selection');
  const [sessionName, setSessionName] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [sessionHistory, setSessionHistory] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedPlatform, setSelectedPlatform] = useState('Netflix');
  const [errorMessage, setErrorMessage] = useState('');
  const [readyUsers] = useState(3);
  const [notification, setNotification] = useState(null);

  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateQRCode = async (url) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url);
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const loadSessionHistory = async () => {
    try {
      const sessions = await sessionAPI.getAllSessions();
      setSessionHistory(sessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  useEffect(() => {
    loadSessionHistory();
  }, []);

  useEffect(() => {
    if (activeSession?.link) {
      generateQRCode(`https://${activeSession.link}`);
    }
  }, [activeSession]);

  const renderPollSection = () => {
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Animation', 'Romance', 'Sci-Fi', 'Fantasy', 'Documentary'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Chinese', 'Portuguese'];
    const platforms = ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime', 'Hulu', 'Apple TV+', 'Crunchyroll', 'Paramount+'];

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
                onClick={async () => {
                  setSelectedGenre(genre);
                  if (activeSession) {
                    try {
                      await updateSessionPreferences(activeSession.code, {
                        genres: [genre],
                        languages: [selectedLanguage],
                        platforms: [selectedPlatform]
                      });
                    } catch (error) {
                      console.log('Preferences will be saved later');
                    }
                  }
                }}
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
                onClick={async () => {
                  setSelectedLanguage(language);
                  if (activeSession) {
                    try {
                      await updateSessionPreferences(activeSession.code, {
                        genres: [selectedGenre],
                        languages: [language],
                        platforms: [selectedPlatform]
                      });
                    } catch (error) {
                      console.log('Preferences will be saved later');
                    }
                  }
                }}
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
                onClick={async () => {
                  setSelectedPlatform(platform);
                  if (activeSession) {
                    try {
                      await updateSessionPreferences(activeSession.code, {
                        genres: [selectedGenre],
                        languages: [selectedLanguage],
                        platforms: [platform]
                      });
                    } catch (error) {
                      console.log('Preferences will be saved later');
                    }
                  }
                }}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleNewSession = () => {
    setCurrentView('newSession');
  };

  const handleExistingSession = () => {
    setCurrentView('existingSession');
  };

  const createSession = async () => {
    if (!sessionName.trim()) {
      setErrorMessage('Please enter a session name!');
      return;
    }
    
    try {
      setErrorMessage('');
      const newCode = generateSessionCode();
      const sessionData = {
        name: sessionName,
        code: newCode,
        id: `#${Math.floor(Math.random() * 100000)}`,
        link: `fairflix.com/join/${newCode}`
      };
      
      const session = await sessionAPI.createSession(sessionData);
      setActiveSession(session);
      loadSessionHistory();
      setCurrentView('sessionActive');
      setNotification({ message: 'Session created successfully!', type: 'success' });
    } catch (error) {
      setErrorMessage('Failed to create session. Please try again.');
    }
  };

  const hostExistingSession = async () => {
    if (!sessionCode.trim()) {
      setErrorMessage('Please enter a session code!');
      return;
    }
    
    try {
      const code = sessionCode.toUpperCase();
      const session = await sessionAPI.getSessionByCode(code);
      
      if (session) {
        setErrorMessage('');
        setActiveSession(session);
        setCurrentView('sessionActive');
        setNotification({ message: 'Session found and activated!', type: 'success' });
      } else {
        setErrorMessage(`Session code "${code}" not found. Please check the code or create a new session.`);
      }
    } catch (error) {
      setErrorMessage('Failed to find session. Please try again.');
    }
  };

  const renderSelectionView = () => (
    <div className="session-container">
      <button className="help-button" onClick={() => setShowHelpDialog(true)}>?</button>
      <h1 className="session-title">Let's get this Started!</h1>
      
      <div className="session-options">
        <div className="option-container">
          <div className="action-box-container">
            <img src={actionBoxFull} alt="Action Box" className="action-box-full" />
          </div>
          <button className="session-btn new-session-btn" onClick={handleNewSession}>Host New Session</button>
        </div>
        
        <div className="option-container">
          <div className="popcorn-container">
            <img src={popcornBucket} alt="Popcorn" className="popcorn-icon" />
          </div>
          <button className="session-btn existing-session-btn" onClick={handleExistingSession}>Host Existing session</button>
        </div>
      </div>
    </div>
  );

  const renderNewSessionView = () => (
    <div className="session-form-container">
      <h1 className="form-title">New Session Creation</h1>
      
      <div className="form-content">
        <div className="input-section">
          <div className="input-group">
            <label>Session Name:</label>
            <input 
              type="text" 
              value={sessionName} 
              onChange={(e) => {
                setSessionName(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Movie Night Squad"
              className="session-input"
            />
          </div>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="create-btn-form" onClick={(e) => {
            e.target.classList.add('button-feedback');
            setTimeout(() => e.target.classList.remove('button-feedback'), 100);
            createSession();
          }}>CREATE</button>
        </div>
        
        <div className="help-section">
          <div className="help-icon-container">
            <img src={actionBoxFull} alt="Help" className="help-icon" />
          </div>
          <div className="help-content">
            <h3>Never made a session?</h3>
            <p>Step 1: Name your session room.</p>
            <p>Step 2: Create or Generate a 6 character code.</p>
            <p>Step 3: Hit "CREATE" and share the code to your group!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExistingSessionView = () => (
    <div className="session-form-container">
      <h1 className="form-title">Host a Previous Session</h1>
      
      <div className="form-content">
        <div className="input-section">
          <div className="input-group">
            <label>Session Code:</label>
            <input 
              type="text" 
              value={sessionCode} 
              onChange={(e) => {
                setSessionCode(e.target.value.toUpperCase());
                setErrorMessage('');
              }}
              placeholder="ABC123"
              className="session-input"
              maxLength="6"
            />
          </div>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="create-btn-form" onClick={(e) => {
            e.target.classList.add('button-feedback');
            setTimeout(() => e.target.classList.remove('button-feedback'), 100);
            hostExistingSession();
          }}>HOST</button>
        </div>
        
        <div className="history-section">
          <div className="history-icon-container">
            <img src={popcornBucket} alt="History" className="history-icon" />
          </div>
          <div className="history-content">
            <h3>Session History</h3>
            {sessionHistory.length === 0 ? (
              <p>No previous sessions found.</p>
            ) : (
              <div className="history-list">
                {sessionHistory.map((session, index) => (
                  <div key={index} className="history-item" onClick={() => {
                    setSessionCode(session.code);
                  }}>
                    <span>{session.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSessionView = () => (
    <div className="session-active-container">
      <div className="session-info-section">
        <h1 className="active-title">{activeSession?.name}</h1>
        
        <div className="session-details-grid">
          <div className="session-info-left">
            <div className="session-info-item">
              <span className="info-label">Session ID:</span>
              <span className="info-value">{activeSession?.id}</span>
            </div>
            <div className="session-info-item">
              <span className="info-label">Session Code:</span>
              <span className="info-value">{activeSession?.code}</span>
            </div>
            <div className="session-info-item" style={{gridColumn: 'span 2'}}>
              <span className="info-label">Invite Link:</span>
              <span className="info-value copy-link" onClick={(e) => {
                navigator.clipboard.writeText(activeSession?.link);
                e.target.classList.add('copy-feedback');
                setTimeout(() => e.target.classList.remove('copy-feedback'), 1000);
                setNotification({ message: 'Link copied to clipboard!', type: 'success' });
              }}>{activeSession?.link} 🔗</span>
            </div>
          </div>
          <div className="qr-code-container">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" className="qr-code-img" />
            ) : (
              <div className="qr-code">📱</div>
            )}
            <span className="qr-label">QR Code</span>
          </div>
        </div>
      </div>
      
      <div className="section-divider"></div>
      
      {renderPollSection()}
      
      <div className="session-controls">
        <div className="ready-users-display">
          <span className="thumbs-up-icon">👍</span>
          <span className="ready-count">{readyUsers}</span>
          <span className="ready-label">Ready</span>
        </div>
        <button 
          className="begin-selection-btn"
          onClick={() => onNavigate('movieSelection', { 
            sessionCode: activeSession?.code,
            preferences: {
              genres: [selectedGenre],
              languages: [selectedLanguage],
              platforms: [selectedPlatform]
            }
          })}
        >
          Begin Movie Selection
        </button>
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
      
      <main className={`create-session-content ${currentView === 'sessionActive' ? 'scrollable' : currentView !== 'selection' ? 'form-view' : ''}`}>
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
        
        {currentView === 'selection' && renderSelectionView()}
        {currentView === 'newSession' && renderNewSessionView()}
        {currentView === 'existingSession' && renderExistingSessionView()}
        {currentView === 'sessionActive' && renderActiveSessionView()}
      </main>
      
      {showHelpDialog && currentView === 'selection' && (
        <div className="help-dialog-overlay" onClick={() => setShowHelpDialog(false)}>
          <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="help-dialog-header">
              <h2 className="help-dialog-title">How does it work?</h2>
              <button className="help-dialog-close" onClick={() => setShowHelpDialog(false)}>×</button>
            </div>
            <div className="help-dialog-content">
              <p>1. Host a session allowing your group to join in.</p>
              <p>2. While waiting, vote on a genre, filter out, languages and streaming platforms followed by catered movie recommendations.</p>
              <p>3. Proceed to voting and come to a decision in seconds!</p>
            </div>
          </div>
        </div>
      )}
      
      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}

export default CreateSessionPage;