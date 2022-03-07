import { useState, useEffect } from "react" 
import { Route, Routes } from 'react-router-dom'
import './App.css';
import * as pedalsAPI from "../../utilities/pedals-api" 
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from '../../utilities/users-service'
import PedalListPage from "../PedalListPage/PedalListPage";
import BoardPage from "../BoardPage/BoardPage";


export default function App() {
  const [user, setUser] = useState(getUser())
  const [pedalsList, setPedalsList] = useState([])
  const [activePedal, setActivePedal] = useState(null);

 

  useEffect(function(){
    async function getPedals() {
      const pedals = await pedalsAPI.getAll();
      setPedalsList(pedals) 
      setActivePedal(pedals[0] || null);
    }
    getPedals();
  }, [])

  async function createPedal(formData) {
    const pedal = await pedalsAPI.newPedalCreate(formData)
    console.log(pedal)
    setPedalsList([...pedalsList, pedal])
  }

    async function deletePedal(id) {
      console.log(id, 'STEP 3')
      const pedalToDelete = await pedalsAPI.deleteAPedal(id)
      console.log(pedalToDelete._id, "this one")
      const upDatedPedalList = pedalsList.filter(pedal => pedalToDelete._id !== pedal._id)
      console.log(upDatedPedalList)
      setPedalsList(upDatedPedalList)
    }




  function handleSelectPedal(pedal) {
    setActivePedal(pedal);
  }


  return (
    <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/board" element={<BoardPage  
        deletePedal={deletePedal}
        createPedal={createPedal} 
        pedalsList={pedalsList} 
        setPedalsList={setPedalsList}
        handleSelectPedal={handleSelectPedal}
        activePedal={activePedal}/>} />
        <Route path="/pedals" element={<PedalListPage  
        deletePedal={deletePedal}
        createPedal={createPedal} 
        pedalsList={pedalsList} 
        setPedalsList={setPedalsList}
        handleSelectPedal={handleSelectPedal}
        activePedal={activePedal}/>} />
      </Routes>
      </>
        :
        <AuthPage setUser={setUser} /> 
      }
      
    </main>
  );
}

