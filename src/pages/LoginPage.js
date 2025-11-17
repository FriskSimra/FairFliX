import fairflixLogo from '../assets/FairFliX_logo.png';
import googleLogo from '../assets/google_login.png';
import Footer from '../components/Footer';

function LoginPage({ onNavigate, onBack, canGoBack, backButtonImg, isLoggedIn }) {
  return (
    <div className="App">
      <header className="header-bar">
        {canGoBack && (
          <button className="back-button" onClick={onBack}>
            <img src={backButtonImg} alt="Back" className="back-button-img" />
          </button>
        )}
      </header>
      
      <main className="login-content">
        <div className="login-container">
          <img src={fairflixLogo} alt="FairFlix Logo" className="login-logo" />
          
          <div className="login-form">
            <h2 className="login-title">Log in</h2>
            
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                className="login-input"
              />
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                className="login-input"
              />
            </div>
            
            <button className="login-submit-btn" onClick={() => onNavigate('landing', 'login')}>Log in</button>
            
            <div className="login-divider">
              <span>or</span>
            </div>
            
            <img src={googleLogo} alt="Continue with Google" className="google-login-img" onClick={() => onNavigate('landing', 'login')} />
            
            <button className="signup-link-btn" onClick={() => onNavigate('signup')}>Sign up</button>
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default LoginPage;