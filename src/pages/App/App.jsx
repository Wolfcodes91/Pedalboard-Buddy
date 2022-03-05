import { useState } from "react" 
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from '../../utilities/users-service'
import PedalList from "../../components/PedalList/PedalList";

export default function App() {
  const [user, setUser] = useState(getUser())
  const [pedalsList, setPedalsList] = useState([])
  return (
    <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser}/>
      </>
        :
        <AuthPage setUser={setUser} /> 
      }
      <PedalList pedalsList={pedalsList} setPedalsList={setPedalsList}/>
    </main>
  );
}

