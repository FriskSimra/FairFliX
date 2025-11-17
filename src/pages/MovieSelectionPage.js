import React, { useState, useEffect } from 'react';
import { getCuratedMovies, getAllMovies } from '../services/api';
import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import Footer from '../components/Footer';
import '../App.css';

const MovieSelectionPage = ({ onNavigate, onBack, canGoBack, backButtonImg, sessionCode, sessionData }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getAllMovies();
        
        // Shuffle and select random number of movies (6-9)
        const randomCount = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, or 9
        const shuffledMovies = [...allMovies].sort(() => Math.random() - 0.5);
        setMovies(shuffledMovies.slice(0, randomCount));
        

      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie.id === selectedMovie?.id ? null : movie);
  };

  const handleBeginVoting = () => {
    if (selectedMovie) {
      // Navigate to voting page with selected movie
      onNavigate('voting', { selectedMovie, sessionCode });
    }
  };

  if (loading) {
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
          <div className="loading">Loading movies...</div>
        </main>
        <Footer onNavigate={onNavigate} />
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
        
        <div className="movie-selection-container">
          <h1 className="session-title">Movie recommendations for you</h1>
          <p className="selection-instruction">
            Please Select ONE of the movies from this list to add to voting
          </p>

          <div className="movies-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
                onClick={() => handleMovieSelect(movie)}
              >
                <div className="selection-movie-poster">
                  <img src={movie.poster} alt={movie.title} />
                  {selectedMovie?.id === movie.id && (
                    <div className="selection-overlay">
                      <div className="checkmark">✓</div>
                    </div>
                  )}
                </div>
                <div className="selection-movie-info">
                  <h3 className="selection-movie-title">{movie.title}</h3>
                  <div className="selection-movie-details">
                    <span className="year">{movie.year}</span>
                    <span className="genre">{movie.genre.join(', ')}</span>
                    <span className="duration">{movie.duration}</span>
                  </div>
                  <div className="selection-movie-ratings">
                    <span className="imdb">★ {movie.imdbRating}/10 IMDb</span>
                    <span className="rt">{movie.rottenTomatoes}% RT</span>
                  </div>
                  <div className="selection-platforms">
                    Available on: {movie.platforms.join(', ')}
                  </div>
                  <div className="selection-movie-description">
                    {movie.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-section">
            <button 
              className={`begin-voting-btn ${selectedMovie ? 'active' : 'disabled'}`}
              onClick={handleBeginVoting}
              disabled={!selectedMovie}
            >
              BEGIN VOTING
            </button>
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default MovieSelectionPage;