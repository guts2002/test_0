import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

const TicTacToe = () => {
  const initialCases = Array(9).fill(null);
  const [cases, setCases] = useState(initialCases);
  const [role, setRole] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (role === 'O') {
      handleComputerMove();
    }
  }, [role]);

  const handlePlaceSelection = (index) => {
    if (cases[index] || winner) {
      return;
    }

    const updatedCases = cases.slice();
    updatedCases[index] = role;
    setCases(updatedCases);

    if (calculateWinner(updatedCases)) {
      setWinner(role);
    } else if (updatedCases.every((square) => square !== null)) {
      setWinner('Tie');
    } else {
      setRole(role === 'X' ? 'O' : 'X');
    }
  };

  const handleComputerMove = () => {
    const emptySquares = cases.reduce((acc, square, index) => {
      if (!square) {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const computerMove = emptySquares[randomIndex];

    handlePlaceSelection(computerMove);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setCases(initialCases);
    setRole('X');
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handlePlaceSelection(index)}>
        {cases[index]}
      </button>
    );
  };

  return (
    <div className="tictactoe-container">
      <h2 className="game-title">Start!</h2>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      {winner && <p>{winner === 'Tie' ? 'It\'s a Tie!' : `Player ${winner} wins!`}</p>}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      <ul>
        <li>
          <Link to="/dashboard" style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px', transition: 'background-color 0.3s' }}>
            Return to Games
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TicTacToe;
