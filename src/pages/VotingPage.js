import React, { useState, useEffect, useRef } from 'react';
import { getAllMovies } from '../services/api';
import fairflixLogo from '../assets/FairFliX_logo.png';
import filmReelBg from '../assets/film_reel_bg_addon.png';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import '../App.css';

const VotingPage = ({ onNavigate, onBack, canGoBack, backButtonImg, sessionData, isLoggedIn, onSignout }) => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [votes, setVotes] = useState({ likes: [], dislikes: [] });
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVoteIndicator, setShowVoteIndicator] = useState(null);
  const [notification, setNotification] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getAllMovies();
        
        // Include the selected movie from previous page and add random others
        const selectedMovie = sessionData?.selectedMovie;
        const otherMovies = allMovies.filter(movie => movie.id !== selectedMovie?.id);
        const shuffledOthers = [...otherMovies].sort(() => Math.random() - 0.5);
        
        // Create voting list with selected movie and 4-6 random others
        const votingMovies = [selectedMovie, ...shuffledOthers.slice(0, Math.floor(Math.random() * 3) + 4)];
        setMovies(votingMovies.filter(Boolean));
        
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [sessionData]);

  const handleVote = (movieId, voteType, fromButton = false) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowVoteIndicator(voteType === 'likes' ? '+1' : '-1');
    
    if (fromButton) {
      setDragOffset({ x: voteType === 'likes' ? 150 : -150, y: 0 });
    }
    
    setVotes(prev => ({
      ...prev,
      [voteType]: [...prev[voteType], movieId]
    }));
    
    setNotification({ 
      message: voteType === 'likes' ? 'Movie liked! 👍' : 'Movie disliked! 👎', 
      type: 'info',
      duration: 1500
    });
    
    // Animate card exit
    setTimeout(() => {
      if (currentMovieIndex < movies.length - 1) {
        setCurrentMovieIndex(prev => prev + 1);
      } else {
        // All movies voted on - navigate to loading page
        onNavigate('voting-loading', { movies, votes });
      }
      setIsAnimating(false);
      setShowVoteIndicator(null);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleLike = () => {
    if (movies[currentMovieIndex]) {
      handleVote(movies[currentMovieIndex].id, 'likes', true);
    }
  };

  const handleDislike = () => {
    if (movies[currentMovieIndex]) {
      handleVote(movies[currentMovieIndex].id, 'dislikes', true);
    }
  };

  const handleWatchTrailer = (trailerLink) => {
    window.open(trailerLink, '_blank');
  };

  // Touch/Mouse event handlers for swipe functionality
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 80;
    
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleLike(); // Swipe right = like
      } else {
        handleDislike(); // Swipe left = dislike
      }
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  if (loading) {
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
          <div className="loading">Loading movies...</div>
        </main>
        <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
      </div>
    );
  }

  const currentMovie = movies[currentMovieIndex];

  if (!currentMovie) {
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
          <div className="voting-complete">
            <h2>Voting Complete!</h2>
            <p>Likes: {votes.likes.length}</p>
            <p>Dislikes: {votes.dislikes.length}</p>
          </div>
        </main>
        <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} onSignout={onSignout} />
      </div>
    );
  }

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
        
        <div className="voting-container">
          <div className="voting-progress">
            <span>{currentMovieIndex + 1} of {movies.length}</span>
          </div>
          
          <div className="movie-card-container">
            {/* Render next cards in stack */}
            {movies.slice(currentMovieIndex + 1, currentMovieIndex + 3).map((movie, index) => (
              <div 
                key={movie.id}
                className="voting-movie-card"
                style={{
                  transform: `scale(${0.95 - index * 0.05}) translateY(${index * 8}px)`,
                  zIndex: 2 - index,
                  opacity: 0.7 - index * 0.2
                }}
              >
                <div className="movie-poster-container">
                  <img src={movie.poster} alt={movie.title} className="movie-poster" />
                </div>
                <div className="movie-details">
                  <h2 className="movie-title">{movie.title}</h2>
                  <div className="movie-meta">
                    <span className="year">{movie.year}</span>
                    <span className="duration">{movie.duration}</span>
                    <span className="rating">★ {movie.imdbRating}</span>
                  </div>
                  <div className="movie-genres">
                    {movie.genre.join(' • ')}
                  </div>
                  <p className="movie-description">{movie.description}</p>
                  <div className="platforms">
                    Available on: {movie.platforms.join(', ')}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Current active card */}
            <div 
              ref={cardRef}
              className={`voting-movie-card ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y * 0.5}px) rotate(${dragOffset.x * 0.1}deg)`,
                opacity: Math.abs(dragOffset.x) > 80 ? 0.7 : 1,
                zIndex: 10
              }}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            >
              <div className="movie-poster-container">
                <img src={currentMovie.poster} alt={currentMovie.title} className="movie-poster" />
                <div className="swipe-indicators">
                  <div className={`dislike-indicator ${dragOffset.x < -40 ? 'active' : ''}`}>NOPE</div>
                  <div className={`like-indicator ${dragOffset.x > 40 ? 'active' : ''}`}>LIKE</div>
                </div>
                {showVoteIndicator && (
                  <div className="vote-indicator">
                    {showVoteIndicator}
                  </div>
                )}
              </div>
              
              <div className="movie-details">
                <h2 className="movie-title">{currentMovie.title}</h2>
                <div className="movie-meta">
                  <span className="year">{currentMovie.year}</span>
                  <span className="duration">{currentMovie.duration}</span>
                  <span className="rating">★ {currentMovie.imdbRating}</span>
                </div>
                <div className="movie-genres">
                  {currentMovie.genre.join(' • ')}
                </div>
                <p className="movie-description">{currentMovie.description}</p>
                <div className="platforms">
                  Available on: {currentMovie.platforms.join(', ')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="voting-actions">
            <button 
              className="dislike-btn"
              onClick={handleDislike}
              disabled={isDragging}
            >
              ✕
            </button>
            
            <button 
              className="trailer-btn"
              onClick={() => handleWatchTrailer(currentMovie.trailerLink)}
              disabled={isDragging}
            >
              ▶ TRAILER
            </button>
            
            <button 
              className="like-btn"
              onClick={handleLike}
              disabled={isDragging}
            >
              ♥
            </button>
          </div>
          
          <div className="swipe-hint">
            Swipe left to dislike, right to like, or use the buttons below
          </div>
        </div>
      </main>
      
      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} />
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          duration={notification.duration}
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
};

export default VotingPage;