import './App.css';
import { useState, useRef } from "react" 
import { Route, Routes } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { ChakraProvider } from '@chakra-ui/react'
import * as pedalsAPI from "../../utilities/pedals-api" 
import * as boardsAPI from "../../utilities/boards-api" 
import { useDisclosure } from '@chakra-ui/react'
import NavBar from "../../components/NavBar/NavBar";
import BoardPage from "../BoardPage/BoardPage";

export default function App() {
  const [user, setUser] = useState(getUser())
  const [userBoards, setUserBoards] = useState([])
  const [pedalsList, setPedalsList] = useState([])
  const [activePedal, setActivePedal] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [updatedBoard, setUpdatedBoard] = useState()
  const [photos, setPhotos] = useState([]);
  const [chosenBoard, setChosenBoard] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
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
  const pedals = pedalsList.filter(pedal => !boardSpot.some(p => p._id === pedal._id));

  async function createPedal(formData) {
    const pedal = await pedalsAPI.newPedalCreate(formData)
    setPedalsList([...pedalsList, pedal])
  }
  async function createPedalboard(form) {
    const pedalboard = await boardsAPI.newPedalboardCreate(form)
    setUserBoards([...userBoards, pedalboard])
  }

  async function deletePedal(id) {
    const pedalToDelete = await pedalsAPI.deleteAPedal(id)
    const upDatedPedalList = pedalsList.filter(pedal => pedalToDelete._id !== pedal._id)
    setPedalsList(upDatedPedalList)
  }

  async function deleteBoard(board) {
    const boardToDelete = await boardsAPI.deleteABoard(board)
    const upDatedBoardList = userBoards.filter(board => boardToDelete._id !== board._id)
    setUserBoards(upDatedBoardList)
  }

  async function updatePedal(editData, id) {
    const pedalToUpdate = await pedalsAPI.updateAPedal(editData, id)
    const updatedPedal = pedalsList.map(p => p._id === pedalToUpdate._id ? pedalToUpdate : p)
    setPedalsList(updatedPedal)
  }

  async function updateBoard(editData) {
    const boardToUpdate = await boardsAPI.updateABoard(editData)
    const updatedBoard = userBoards.map(b => b._id === boardToUpdate._id ? boardToUpdate : b)
    setUpdatedBoard(updatedBoard)
  }

  function handleSelectPedal(pedal) {
    setActivePedal(pedal);
  }

  return (
    <ChakraProvider>
    <main className="App"
    style={{ backgroundImage: `url(Photos/Floor.jpeg)` }}
    >
      <>
      <NavBar 
        user={user} 
        setUser={setUser}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        setUserBoards={setUserBoards}
        boardSpot={boardSpot}
        setBoardSpot={setBoardSpot}
      />
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
        setActivePedal={setActivePedal}
        photos={photos}
        setPhotos={setPhotos}
        boardSpot={boardSpot}
        setBoardSpot={setBoardSpot}
        createPedalboard={createPedalboard}
        user={user}
        setUser={setUser}
        userBoards={userBoards}
        setUserBoards={setUserBoards}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        deleteBoard={deleteBoard}
        pedals={pedals}
        chosenBoard={chosenBoard}
        setChosenBoard={setChosenBoard}
        updateBoard={updateBoard}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        />} 
        />
      </Routes>
      </> 
    </main>
    </ChakraProvider>
  );
}

