import './App.css';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateSessionPage from './pages/CreateSessionPage';
import JoinSessionPage from './pages/JoinSessionPage';
import backButtonImg from './assets/fairflix_back_button.png';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [navigationHistory, setNavigationHistory] = useState(['landing']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleNavigation = (page, action = null) => {
    if ((page === 'createSession' || page === 'joinSession') && !isLoggedIn) {
      setPendingAction(page);
      setNavigationHistory(prev => [...prev, 'login']);
      setCurrentPage('login');
      return;
    }
    
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
    
    if (action === 'login' || action === 'signup') {
      setIsLoggedIn(true);
      if (pendingAction) {
        const actionToExecute = pendingAction;
        setPendingAction(null);
        setTimeout(() => {
          setNavigationHistory(prev => [...prev, actionToExecute]);
          setCurrentPage(actionToExecute);
        }, 100);
      }
    }
  };

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  };

  const renderPage = () => {
    const pageProps = {
      onNavigate: handleNavigation,
      onBack: handleBack,
      canGoBack: navigationHistory.length > 1,
      backButtonImg,
      isLoggedIn
    };

    switch(currentPage) {
      case 'login':
        return <LoginPage {...pageProps} />;
      case 'signup':
        return <SignupPage {...pageProps} />;
      case 'createSession':
        return <CreateSessionPage {...pageProps} />;
      case 'joinSession':
        return <JoinSessionPage {...pageProps} />;
      default:
        return <LandingPage {...pageProps} />;
    }
  };

  return renderPage();
}

export default App;
