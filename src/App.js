import './App.css';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateSessionPage from './pages/CreateSessionPage';
import JoinSessionPage from './pages/JoinSessionPage';
import MovieSelectionPage from './pages/MovieSelectionPage';
import backButtonImg from './assets/fairflix_back_button.png';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [navigationHistory, setNavigationHistory] = useState(['landing']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const handleNavigation = (page, data = null) => {
    if ((page === 'createSession' || page === 'joinSession') && !isLoggedIn) {
      setPendingAction(page);
      setNavigationHistory(prev => [...prev, 'login']);
      setCurrentPage('login');
      return;
    }
    
    // Store session data for movie selection
    if (data && (data.sessionCode || data.selectedMovie)) {
      setSessionData(data);
    }
    
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
    
    if (data === 'login' || data === 'signup') {
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
      isLoggedIn,
      sessionData
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
      case 'movieSelection':
        return <MovieSelectionPage {...pageProps} sessionCode={sessionData?.sessionCode} />;
      default:
        return <LandingPage {...pageProps} />;
    }
  };

  return renderPage();
}

export default App;
