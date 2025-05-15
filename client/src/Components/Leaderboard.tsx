import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './Leaderboard.css';

interface LeaderboardProps{
    setShowLeaderboard: (value: boolean) => void;
}


function Leaderboard({ setShowLeaderboard }: LeaderboardProps) {
    return (
        <div className='Leaderboard'>
            <div className='header-leaderboard'>
                <h1 className='leaderboard-title'> Топ игроков</h1>
            </div>

            <div className='content-leaderboard'>

                <ul className='leaderboard-list'>
                    <h2>Лучшие игроки:</h2>

                    <li>
                        <div className='leaderboard-item'>
                            <div className='leaderboard-rank'>

                                <h3 className='leaderboard-place'>
                                    <span id='leaderboard-place'>1</span>.
                                </h3>

                                <h3 className='leaderboard-name'>
                                    <span id='leaderboard-name'>Имя</span>
                                </h3>

                            </div>

                            <h3 className='leaderboard-score'>
                                <span id='leaderboard-score'>10</span>
                            </h3>

                        </div>
                    </li>

                    <li>
                        <div className='leaderboard-item'>
                            <div className='leaderboard-rank'>

                                <h3 className='leaderboard-place'>
                                    <span id='leaderboard-place'>1</span>.
                                </h3>

                                <h3 className='leaderboard-name'>
                                    <span id='leaderboard-name'>Имя</span>
                                </h3>

                            </div>

                            <h3 className='leaderboard-score'>
                                <span id='leaderboard-score'>10</span>
                            </h3>

                        </div>
                    </li>

                    <li>
                        <div className='leaderboard-item'>
                            <div className='leaderboard-rank'>

                                <h3 className='leaderboard-place'>
                                    <span id='leaderboard-place'>1</span>.
                                </h3>

                                <h3 className='leaderboard-name'>
                                    <span id='leaderboard-name'>Имя</span>
                                </h3>
                            </div>

                            <h3 className='leaderboard-score'>
                                <span id='leaderboard-score'>10</span>
                            </h3>

                        </div>
                    </li>
                </ul>
            </div>
            
            <div className='footer-leaderboard'>
                
                <button className='btn-home' onClick={() => setShowLeaderboard(false)}>
                    <FontAwesomeIcon icon={faHouse} />
                </button>

            </div>
        </div>
    );
}

export default Leaderboard;