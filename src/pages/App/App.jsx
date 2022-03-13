import './App.css';
import { useState, useEffect } from "react" 
import { Route, Routes } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as pedalsAPI from "../../utilities/pedals-api" 
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import BoardPage from "../BoardPage/BoardPage";

export default function App() {
  const [user, setUser] = useState(getUser())
  const [pedalsList, setPedalsList] = useState([])
  const [activePedal, setActivePedal] = useState(null);
  const [updatedPedal, setUpdatedPedal] = useState()
  const [photos, setPhotos] = useState([]);
  const [boardSpot, setBoardSpot] = useState([
    {number: '0'},
    {number: '1'},
    {number: '2'},
    {number: '3'},
    {number: '4'},
    {number: '5'},
    {number: '6'},
    {number: '7'},
  ])

  useEffect(function(){
    async function getPedals() {
      const pedals = await pedalsAPI.getAll();
      setPedalsList(pedals) 
      setActivePedal(pedals[0] || null);
      // setBoardSpot(boardSpot)
    }
    getPedals();
  }, [])

  async function createPedal(formData) {
    const pedal = await pedalsAPI.newPedalCreate(formData)
    setPedalsList([...pedalsList, pedal])
    console.log('createPedal')
  }

  async function deletePedal(id) {
    const pedalToDelete = await pedalsAPI.deleteAPedal(id)
    const upDatedPedalList = pedalsList.filter(pedal => pedalToDelete._id !== pedal._id)
    setPedalsList(upDatedPedalList)
  }

  async function updatePedal(editData) {
    console.log('2', editData)
    const pedalToUpdate = await pedalsAPI.updateAPedal(editData)
    const updatedPedal = pedalsList.map(p => p._id === pedalToUpdate._id ? pedalToUpdate : p)
    setUpdatedPedal(pedalToUpdate)
    setPedalsList(updatedPedal)
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
        <Route 
        path="/" 
        element={<BoardPage  
        deletePedal={deletePedal}
        createPedal={createPedal} 
        pedalsList={pedalsList} 
        setPedalsList={setPedalsList}
        handleSelectPedal={handleSelectPedal}
        updatePedal={updatePedal}
        activePedal={activePedal}
        photos={photos}
        setPhotos={setPhotos}
        boardSpot={boardSpot}
        setBoardSpot={setBoardSpot}
        />} 
        />
      </Routes>
      </>
        :
        <AuthPage setUser={setUser} /> 
      }
      
    </main>
  );
}

