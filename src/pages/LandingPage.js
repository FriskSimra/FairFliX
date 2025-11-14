import fairflixLogo from '../assets/FairFliX_logo.png';
import Footer from '../components/Footer';

function LandingPage({ onNavigate, onBack, canGoBack, backButtonImg, isLoggedIn }) {
  return (
    <div className="App">
      <header className="header-bar">
        {canGoBack && (
          <button className="back-button" onClick={onBack}>
            <img src={backButtonImg} alt="Back" className="back-button-img" />
          </button>
        )}
      </header>
      
      <main className="main-content">
        <h1 className="welcome-text">Welcome to</h1>
        <div className="logo-container">
          <img src={fairflixLogo} alt="FairFlix Logo" className="center-logo" />
          <p className="tagline">---You're new hub for agreeing on what to watch---</p>
        </div>
        
        <div className="button-container">
          <button className="action-btn create-btn" onClick={() => onNavigate('createSession')}>Create a Session</button>
          <button className="action-btn join-btn">Join a Session</button>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default LandingPage;