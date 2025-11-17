import { useState } from 'react';
import metaLogo from '../assets/meta_logo.png';
import instaLogo from '../assets/insta_logo.png';
import twitterLogo from '../assets/twitter_logo.png';

function Footer({ onNavigate, isLoggedIn }) {
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const toggleProfileDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  const handleLogin = () => {
    onNavigate('login');
    setShowProfileDialog(false);
  };

  const handleSignup = () => {
    onNavigate('signup');
    setShowProfileDialog(false);
  };

  const handleSignout = () => {
    onNavigate('landing');
    setShowProfileDialog(false);
  };

  const handleAbout = () => {
    onNavigate('about');
    setShowProfileDialog(false);
  };

  return (
    <footer className="footer-bar">
      <div className="footer-left">
        <div className="profile-icon" onClick={toggleProfileDialog}>👤</div>
        {showProfileDialog && (
          <div className="profile-dialog">
            {isLoggedIn ? (
              <button className="dialog-btn signup-btn" onClick={handleSignout}>Sign out</button>
            ) : (
              <>
                <button className="dialog-btn login-btn" onClick={handleLogin}>Log in</button>
                <button className="dialog-btn signup-btn" onClick={handleSignup}>Sign up</button>
              </>
            )}
            <button className="dialog-btn">Help & Support</button>
            <button className="dialog-btn" onClick={handleAbout}>About</button>
          </div>
        )}
      </div>
      <div className="footer-right">
        <a href="#" className="social-icon">
          <img src={metaLogo} alt="Facebook" className="social-img" />
        </a>
        <a href="#" className="social-icon">
          <img src={instaLogo} alt="Instagram" className="social-img" />
        </a>
        <a href="#" className="social-icon">
          <img src={twitterLogo} alt="Twitter" className="social-img" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;