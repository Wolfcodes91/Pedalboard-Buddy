import { useState, useEffect } from "react" 
import { Route, Routes } from 'react-router-dom'
import './App.css';
import * as pedalsAPI from "../../utilities/pedals-api" 
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from '../../utilities/users-service'
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
    setPedalsList([...pedalsList, pedal])
  }

    async function deletePedal(id) {
      const pedalToDelete = await pedalsAPI.deleteAPedal(id)
      const upDatedPedalList = pedalsList.filter(pedal => pedalToDelete._id !== pedal._id)
      setPedalsList(upDatedPedalList)
    }

    async function updatePedal(pedal) {
      const pedalToUpdate = await pedalsAPI.updateAPedal(pedal)
      console.log(pedalToUpdate, '3')
      
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
        updatePedal={updatePedal}
        activePedal={activePedal}/>} />
      </Routes>
      </>
        :
        <AuthPage setUser={setUser} /> 
      }
      
    </main>
  );
}

