import fairflixLogo from '../assets/FairFliX_logo.png';
import googleLogo from '../assets/google_login.png';
import Footer from '../components/Footer';

function SignupPage({ onNavigate, onBack, canGoBack, backButtonImg }) {
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
            <h2 className="login-title">Sign up</h2>
            
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="login-input"
              />
            </div>
            
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
            
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className="login-input"
              />
            </div>
            
            <button className="login-submit-btn" onClick={() => onNavigate('landing', 'signup')}>Sign up</button>
            
            <div className="login-divider">
              <span>or</span>
            </div>
            
            <img src={googleLogo} alt="Continue with Google" className="google-login-img" />
            
            <button className="signup-link-btn" onClick={() => onNavigate('login')}>
              Already have an account? Log in
            </button>
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default SignupPage;