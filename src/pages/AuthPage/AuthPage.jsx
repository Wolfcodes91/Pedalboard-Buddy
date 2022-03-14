import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser, boardSpot, setBoardSpot }) {
  const [showLogin, setShowLogin] = useState(true);

  function handleClearBoard(evt) {
    evt.preventDefault()
    boardSpot = [
        {number: '0'},
        {number: '1'},
        {number: '2'},
        {number: '3'},
        {number: '4'},
        {number: '5'},
        {number: '6'},
        {number: '7'},
    ]
    setBoardSpot(boardSpot)
  }
  return (
    <main>
      <h1>AuthPage</h1>
      <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up' : 'Log In'}</button>
      { showLogin ?
        <LoginForm 
        setUser={setUser} 
        handleClearBoard={handleClearBoard}
        />
        :
        <SignUpForm setUser={setUser} 
        handleClearBoard={handleClearBoard}
        />
      }
    </main>
  );
}