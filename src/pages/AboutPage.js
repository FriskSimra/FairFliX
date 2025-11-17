import fairflixLogo from '../assets/FairFliX_logo.png';
import actionBoxFull from '../assets/actionbox_full.png';
import popcornBucket from '../assets/popcorn_bucket.png';
import joinTicket from '../assets/join_session_ticket.png';
import ticketBooth from '../assets/join_session_ticketbooth.png';
import Footer from '../components/Footer';

function AboutPage({ onNavigate, onBack, canGoBack, backButtonImg, isLoggedIn, onSignout }) {
  return (
    <div className="App">
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
      
      <main className="create-session-content scrollable">
        <div className="about-animated-images">
          <img src={actionBoxFull} alt="Action Box" className="about-image about-action-box" />
          <img src={popcornBucket} alt="Popcorn" className="about-image about-popcorn" />
          <img src={joinTicket} alt="Ticket" className="about-image about-ticket" />
          <img src={ticketBooth} alt="Ticket Booth" className="about-image about-booth" />
        </div>
        
        <div className="session-container">
          <h1 className="session-title">About FairFlix</h1>
          
          <div className="join-help-section">
            <h3>What is FairFlix?</h3>
            <p>FairFlix is your new hub for agreeing on what to watch. No more endless scrolling or arguments about movie choices!</p>
            
            <h3>How it works</h3>
            <p>• Create or join a session with friends</p>
            <p>• Select movies you'd like to watch</p>
            <p>• Vote on movies together</p>
            <p>• Get a winner that everyone agrees on</p>
            
            <h3>Features</h3>
            <p>• Real-time voting with friends</p>
            <p>• Movie recommendations and details</p>
            <p>• Fair voting system</p>
            <p>• Easy session sharing</p>
            
            <h3>Contact</h3>
            <p>For support or feedback, reach out to us through our social media channels.</p>
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
    </div>
  );
}

export default AboutPage;