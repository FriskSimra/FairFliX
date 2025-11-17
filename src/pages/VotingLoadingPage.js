import React, { useEffect } from 'react';
import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import Footer from '../components/Footer';
import '../App.css';

const VotingLoadingPage = ({ onNavigate, onBack, canGoBack, backButtonImg, sessionData, isLoggedIn, onSignout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate vote calculation and navigate to results
      const { movies, votes } = sessionData;
      
      // Generate mock votes for other users
      const totalMovies = movies.length;
      const mockResults = movies.map(movie => {
        const userLikes = votes.likes.includes(movie.id) ? 1 : 0;
        const userDislikes = votes.dislikes.includes(movie.id) ? 1 : 0;
        
        // Generate mock votes from other users (totalMovies - 1 to account for current user)
        const otherVoters = totalMovies - 1;
        const mockLikes = Math.floor(Math.random() * (otherVoters + 1));
        const mockDislikes = otherVoters - mockLikes;
        
        const totalLikes = mockLikes + userLikes;
        const totalDislikes = mockDislikes + userDislikes;
        const score = totalLikes - totalDislikes;
        
        return {
          ...movie,
          likes: totalLikes,
          dislikes: totalDislikes,
          score
        };
      });

      // Sort by score (highest first)
      const rankedMovies = mockResults.sort((a, b) => b.score - a.score);
      const winner = rankedMovies[0];

      onNavigate('voting-results', { 
        votingResults: { 
          rankedMovies, 
          winner 
        } 
      });
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, [onNavigate, sessionData]);

  return (
    <div className="App voting-page">
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
      
      <main className="voting-content">
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
        
        <div className="voting-animation-bg">
          <div className="floating-votes">
            <div className="vote-bubble vote-1">👍</div>
            <div className="vote-bubble vote-2">👎</div>
            <div className="vote-bubble vote-3">⭐</div>
            <div className="vote-bubble vote-4">🎬</div>
            <div className="vote-bubble vote-5">🍿</div>
          </div>
        </div>
        
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 className="loading-title">Calculating Votes...</h2>
          <p className="loading-subtitle">Tallying results from all participants</p>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
    </div>
  );
};

export default VotingLoadingPage;