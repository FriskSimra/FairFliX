import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import actionBoxFull from '../assets/actionbox_full.png';
import popcornBucket from '../assets/popcorn_bucket.png';
import Footer from '../components/Footer';

function CreateSessionPage({ onNavigate, onBack, canGoBack, backButtonImg }) {
  return (
    <div className="App">
      <header className="header-bar">
        {canGoBack && (
          <button className="back-button" onClick={onBack}>
            <img src={backButtonImg} alt="Back" className="back-button-img" />
          </button>
        )}
      </header>
      
      <main className="create-session-content">
        <img src={filmReelBg} alt="Film Reel" className="film-reel left-reel" />
        <img src={filmReelBg} alt="Film Reel" className="film-reel right-reel" />
        
        <div className="session-container">
          <h1 className="session-title">Let's get this Started!</h1>
          
          <div className="how-it-works">
            <h2 className="how-title">How does it work?</h2>
            <div className="steps">
              <p>1. Host a session allowing your group to join in.</p>
              <p>2. While waiting, vote on a genre, filter out, languages and streaming platforms followed by catered movie recommendations.</p>
              <p>3. Proceed to voting and come to a decision in seconds!</p>
            </div>
          </div>
          
          <div className="session-options">
            <div className="option-container">
              <div className="action-box-container">
                <img src={actionBoxFull} alt="Action Box" className="action-box-full" />
              </div>
              <button className="session-btn new-session-btn">Host a new Session</button>
            </div>
            
            <div className="option-container">
              <div className="popcorn-container">
                <img src={popcornBucket} alt="Popcorn" className="popcorn-icon" />
              </div>
              <button className="session-btn existing-session-btn">Host an existing session</button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default CreateSessionPage;