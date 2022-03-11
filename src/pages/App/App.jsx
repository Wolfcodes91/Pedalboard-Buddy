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
  const [activeDiv, setActiveDiv] = useState(null)
  const [updatedPedal, setUpdatedPedal] = useState()
  const [photos, setPhotos] = useState([]);
  const [boardSpot, setBoardSpot] = useState([
    {boardId: 0, pedalId: ''},
    {boardId: 1, pedalId: ''},
    {boardId: 2, pedalId: ''},
    {boardId: 3, pedalId: ''},
    {boardId: 4, pedalId: ''},
    {boardId: 5, pedalId: ''},
    {boardId: 6, pedalId: ''},
    {boardId: 7, pedalId: ''},
  ])

  useEffect(function(){
    async function getPedals() {
      const pedals = await pedalsAPI.getAll();
      setPedalsList(pedals) 
      setActivePedal(pedals[0] || null);
      // setActiveDiv(boardSpot[0] || null);
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
  function handleSelectDiv(b, index) {
    setActiveDiv(b);
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
        handleSelectDiv={handleSelectDiv}
        activeDiv={activeDiv}
        setActiveDiv={setActiveDiv}
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

