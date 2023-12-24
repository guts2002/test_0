import React from 'react';
import { Link } from 'gatsby';

const TicTacToe = () => {
  return (
    <div className="homepage-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(45deg, #3498db, #e74c3c, #2ecc71, #e67e22)', backgroundSize: '400% 400%', animation: 'gradientAnimation 15s infinite' }}>
      <style>
        {`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <h1 className="title1" style={{ color: 'yellow' }}> WELCOME  TO   TIC TAC TOE   </h1>
      <h1 className="title2" style={{ color: 'yellow' }}> Select  mode : </h1>
      <ul className="choice-menu" style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <a href="/player-vs-player" style={{ display: 'block', padding: '15px 20px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            PLAYER 1 vs PLAYER 2
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="/player-vs-computer" style={{ display: 'block', padding: '15px 20px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            PLAYER vs COMPUTER
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/dashboard" style={{ display: 'block', padding: '15px 20px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Return to Games
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TicTacToe;
