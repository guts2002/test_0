// index.js
import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { auth } from './firebase'; // Update the path accordingly
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword separately
import backgroundImage from '../images/1.jpg';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/tic-tac-toe');
    } catch (error) {
      console.error("Error creating user:", error.code, error.message);
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 style={{ fontSize: '70px', fontWeight: 'bold', color: 'yellow' }}>WELCOME TO Games</h1>
      <form
        className="login-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
        onSubmit={handleFormSubmit}
      >
        <label style={{ marginBottom: '10px', width: '100%', color: 'white', fontSize: '40px' }}>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} style={{ width: '100%', color: 'black' }} />
        </label>
        <label style={{ marginBottom: '10px', width: '100%', color: 'white', fontSize: '40px' }}>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} style={{ width: '100%', color: 'black' }} />
        </label>
        <label style={{ marginBottom: '10px', width: '100%', color: 'white', fontSize: '40px' }}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', color: 'black' }} />
        </label>
        <label style={{ marginBottom: '10px', width: '100%', color: 'white', fontSize: '40px' }}>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{ width: '100%', color: 'black' }}
          />
        </label>
        <button type="submit" style={{ marginTop: '20px', padding: '15px 20px', fontSize: '18px', backgroundColor: 'blue', color: 'yellow', border: 'none', borderRadius: '5px' }}>
          Sign In
        </button>
      </form>
      <ul className="choice-menu"></ul>
    </div>
  );
};

export default HomePage;
