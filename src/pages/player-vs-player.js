import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBqDLMOdA7XX1JOu3kkvGRhoTUiaI_JGJw",
  authDomain: "test-4f607.firebaseapp.com",
  databaseURL: "https://test-4f607-default-rtdb.firebaseio.com",
  projectId: "test-4f607",
  storageBucket: "test-4f607.appspot.com",
  messagingSenderId: "15015703257",
  appId: "1:15015703257:web:e6deca69f53021c8b204c8",
  measurementId: "G-VBKMZD35HC"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const TicTacToe = () => {
  const initialCases = Array(9).fill(null);
  const [cases, setCases] = useState(initialCases);
  const [role, setRole] = useState(null);
  const [winner, setWinner] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('Player 1');

  useEffect(() => {
    const gameRef = ref(database, 'tictactoe');

    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCases(data.cases || initialCases);
        setRole(data.role || null);
        setWinner(data.winner || null);
        setCurrentTurn(data.role === 'X' ? 'Player 1' : 'Player 2');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [database, initialCases]);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);

    set(ref(database, 'tictactoe'), {
      cases: initialCases,
      role: selectedRole,
      winner: null,
    });

    setCurrentTurn(selectedRole === 'X' ? 'Player 1' : 'Player 2');
  };

  const renderRoleSelection = () => {
    return (
      <div>
        <h3>Select Your Role:</h3>
        <button onClick={() => handleRoleSelection('X')}>X</button>
        <button onClick={() => handleRoleSelection('O')}>O</button>
      </div>
    );
  };

  if (!role) {
    return renderRoleSelection();
  }

  const handlePlaceSelection = (index) => {
    if (cases[index] || winner) {
      return;
    }

    const updatedCases = cases.slice();
    updatedCases[index] = role;
    setCases(updatedCases);

    set(ref(database, 'tictactoe'), {
      cases: updatedCases,
      role: role === 'X' ? 'O' : 'X',
      winner: calculateWinner(updatedCases),
    });

    setCurrentTurn(role === 'X' ? 'Player 2' : 'Player 1');
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
    setRole(null);
    setWinner(null);

    set(ref(database, 'tictactoe'), {
      cases: initialCases,
      role: null,
      winner: null,
    });

    setCurrentTurn('Player 1');
  };

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => handlePlaceSelection(index)}
        style={{
          width: '50px',
          height: '50px',
          fontSize: '18px',
          backgroundColor: '#87CEEB',
        }}
      >
        {cases[index]}
      </button>
    );
  };

  return (
    <div className="tictactoe-container">
      <h2
        className="game-title"
        style={{
          fontSize: '70px',
          color: 'yellow',
        }}
      >
        {winner ? `Game Over! ${winner === 'Tie' ? 'It\'s a Tie!' : `Player ${winner} wins!`}` : 'Tic Tac Toe'}
      </h2>
      <p>{`${currentTurn}'s turn`}</p>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      {winner && (
        <p>{winner === 'Tie' ? 'It\'s a Tie!' : `Player ${winner} wins!`}</p>
      )}
      <button
        className="reset-button"
        onClick={resetGame}
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        Reset Game
      </button>
      <Link to="/dashboard">
        <button
          className="navigate-button"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Return to Games
        </button>
      </Link>
    </div>
  );
};

export default TicTacToe;
