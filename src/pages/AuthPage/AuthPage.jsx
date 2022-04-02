import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./AuthPage.css"

export default function AuthPage({ setUser, boardSpot, setBoardSpot, onClose }) {
  const [showLogin, setShowLogin] = useState(true);

  function handleClearBoard2(evt) {
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
      
            <div className='homeLogo'>
      <object className="logos" type="image/svg+xml" data="Photos/pedalboard-buddy-3.svg"></object>
      </div>

      <div className='blurb'>
        <h3>Welcome to Pedalboard Buddy!</h3>
        <p>The first ever touch screen pedalboard designer.</p>
      </div>

      <div className='showBoard'>
        <img className="boardpic" src="Photos/ShowBoard.png" alt="" />
      </div>

      <div className='logIn'
       style={{ backgroundImage: `url(Photos/Velcro.png)` }}
      >
      <button className="loginButton" onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up' : 'Log In'}</button>
      { showLogin ?
        <LoginForm 
        setUser={setUser} 
        handleClearBoard2={handleClearBoard2}
        onClose={onClose}
        />
        :
        <SignUpForm setUser={setUser} 
        handleClearBoard2={handleClearBoard2}
        onClose={onClose}
        />
      }
      </div>
    </main>
  );
}