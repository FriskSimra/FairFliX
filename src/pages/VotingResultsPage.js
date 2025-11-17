import React from 'react';
import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import Footer from '../components/Footer';
import '../App.css';

const VotingResultsPage = ({ onNavigate, onBack, canGoBack, backButtonImg, sessionData, isLoggedIn, onSignout }) => {
  const { votingResults } = sessionData || {};

  if (!votingResults) {
    return (
      <div className="App create-session-page">
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
        <main className="create-session-content">
          <div className="loading">No voting results available</div>
        </main>
        <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
      </div>
    );
  }

  return (
    <div className="App create-session-page">
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
        <div className="film-reel-container left-container">
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
        </div>
        <div className="film-reel-container right-container">
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
          <img src={filmReelBg} alt="Film Reel" className="film-reel-segment" />
        </div>
        
        <div className="results-container">
          <h1 className="session-title">Voting Results</h1>
          
          <div className="winner-section">
            <h2 className="winner-title">🏆 Winner</h2>
            <div className="winner-card">
              <img src={votingResults.winner.poster} alt={votingResults.winner.title} className="winner-poster" />
              <div className="winner-info">
                <h3>{votingResults.winner.title}</h3>
                
                {votingResults.winner.year && votingResults.winner.runtime && (
                  <div className="winner-details">
                    <span>{votingResults.winner.year}</span>
                    <span>{votingResults.winner.runtime}</span>
                    {votingResults.winner.rated && <span>{votingResults.winner.rated}</span>}
                  </div>
                )}
                
                {(votingResults.winner.imdbRating || votingResults.winner.rottenTomatoesRating) && (
                  <div className="winner-ratings">
                    {votingResults.winner.imdbRating && <span>⭐ {votingResults.winner.imdbRating}/10</span>}
                    {votingResults.winner.rottenTomatoesRating && <span>🍅 {votingResults.winner.rottenTomatoesRating}</span>}
                  </div>
                )}
                
                {votingResults.winner.genres && (
                  <div className="winner-genres">
                    {Array.isArray(votingResults.winner.genres) 
                      ? votingResults.winner.genres.join(', ') 
                      : votingResults.winner.genres}
                  </div>
                )}
                
                {votingResults.winner.plot && (
                  <div className="winner-description">
                    {votingResults.winner.plot}
                  </div>
                )}
                
                {votingResults.winner.platforms && (
                  <div className="winner-platforms">
                    Available on: {Array.isArray(votingResults.winner.platforms) 
                      ? votingResults.winner.platforms.join(', ') 
                      : votingResults.winner.platforms}
                  </div>
                )}
                
                <p className="winner-score">Final Score: {votingResults.winner.score}</p>
              </div>
            </div>
          </div>

          <div className="results-list">
            <h3>All Movies Ranked</h3>
            {votingResults.rankedMovies.map((movie, index) => (
              <div key={movie.id} className="result-item">
                <div className="rank">#{index + 1}</div>
                <img src={movie.poster} alt={movie.title} className="result-poster" />
                <div className="result-info">
                  <h4>{movie.title}</h4>
                  <div className="vote-stats">
                    <span className="likes">👍 {movie.likes}</span>
                    <span className="dislikes">👎 {movie.dislikes}</span>
                    <span className="score">Score: {movie.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-section">
            <button 
              className="new-session-btn session-btn"
              onClick={() => onNavigate('create-session')}
            >
              Start New Session
            </button>
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
    </div>
  );
};

export default VotingResultsPage;