import { useState } from "react" 
import './App.css';
import * as pedalsAPI from "../../utilities/pedals-api" 
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from '../../utilities/users-service'
import PedalList from "../../components/PedalList/PedalList";

export default function App() {
  const [user, setUser] = useState(getUser())
  const [pedalsList, setPedalsList] = useState([])

  async function createPedal(formData) {
    console.log('level1')
    const pedal = await pedalsAPI.newPedalCreate(formData)
    setPedalsList([...pedalsList, pedal])
  }

  return (
    <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser}/>
      </>
        :
        <AuthPage setUser={setUser} /> 
      }
      <PedalList createPedal={createPedal}/>
    </main>
  );
}

