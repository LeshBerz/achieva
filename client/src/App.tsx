import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import Leaderboard from './Components/Leaderboard.tsx';

function App() {
  const [score, setScore] = useState<number>(0);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className='App'>
      {showLeaderboard ?
        (<Leaderboard setShowLeaderboard={setShowLeaderboard} />
        
        ) : (
        <>
          <div className='header'>
            
            <h1 className='firstname'>
              <span id='firstname'>Имя</span>
            </h1>

          </div>
          
          <div className='content'>
            <div className='score-container'>
              
              <h2 className='score'>
                <span id='score'>{score}</span>
              </h2>

            </div>
            
            <div className='button-container'>
              <button className='button-click' id='button-click' onClick={handleClick}>Нажми</button>
            </div>

          </div>
          
          <div className='footer'>
            <button className='btn-leaderboard' id='btn-leaderboard' onClick={() => setShowLeaderboard(true)}>
              <FontAwesomeIcon icon={faTrophy} />
            </button>
          </div>

        </>
        )}
    </div>
  );
}

export default App;