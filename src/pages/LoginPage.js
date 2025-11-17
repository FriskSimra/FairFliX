import { useState } from 'react';
import fairflixLogo from '../assets/FairFliX_logo.png';
import googleLogo from '../assets/google_login.png';
import Footer from '../components/Footer';
import Notification from '../components/Notification';

function LoginPage({ onNavigate, onBack, canGoBack, backButtonImg, isLoggedIn, onSignout }) {
  const [notification, setNotification] = useState(null);

  const handleLogin = () => {
    setNotification({ message: 'Logged in successfully!', type: 'success' });
    setTimeout(() => onNavigate('landing', 'login'), 500);
  };

  const handleGoogleLogin = () => {
    setNotification({ message: 'Logging in with Google...', type: 'info' });
    setTimeout(() => onNavigate('landing', 'login'), 500);
  };
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
            
            <button className="login-submit-btn" onClick={handleLogin}>Log in</button>
            
            <div className="login-divider">
              <span>or</span>
            </div>
            
            <img src={googleLogo} alt="Continue with Google" className="google-login-img" onClick={handleGoogleLogin} />
            
            <button className="signup-link-btn" onClick={() => onNavigate('signup')}>Sign up</button>
          </div>
        </div>
      </main>
      
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

export default LoginPage;