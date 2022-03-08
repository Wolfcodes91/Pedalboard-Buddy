import { useState, useEffect, useRef } from "react" 
import { Route, Routes } from 'react-router-dom'
import './App.css';
import * as pedalsAPI from "../../utilities/pedals-api" 
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from '../../utilities/users-service'
import BoardPage from "../BoardPage/BoardPage";
import * as photosAPI from '../../utilities/photos-api';




export default function App() {
  const [user, setUser] = useState(getUser())
  const [pedalsList, setPedalsList] = useState([])
  const [activePedal, setActivePedal] = useState(null);
  const [updatedPedal, setUpdatedPedal] = useState()
  const [photos, setPhotos] = useState([]);

 
  // Use a ref prop on the <input> in the JSX to
  // create a reference to the <input>, i.e.,
  // inputRef.current will be the <input> DOM element
  const fileInputRef = useRef();

  // Fetch existing uploaded photos after first render
  // Photos will be sorted in the controller with the most recent first
  useEffect(function() {
    photosAPI.getAll().then(photos => setPhotos(photos));
  }, []);




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

    async function updatePedal(editData) {
      const pedalToUpdate = await pedalsAPI.updateAPedal(editData)
      const updatedPedal = pedalsList.map(p => p._id === pedalToUpdate._id ? pedalToUpdate : p)
      setUpdatedPedal(pedalToUpdate)
      setPedalsList(updatedPedal)
    }


    async function handleUpload() {
      // Use FormData object to send the inputs in the fetch request
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_a_file
      const photoFormData = new FormData();
      photoFormData.append('photo', fileInputRef.current.files[0]);
      const newPhoto = await photosAPI.upload(photoFormData);
      setPhotos([newPhoto, ...photos]);
      // Clear the description and file inputs
      fileInputRef.current.value = '';
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
        path="/board" 
        element={<BoardPage  
        deletePedal={deletePedal}
        createPedal={createPedal} 
        pedalsList={pedalsList} 
        setPedalsList={setPedalsList}
        handleSelectPedal={handleSelectPedal}
        updatePedal={updatePedal}
        activePedal={activePedal}
        handleUpload={handleUpload}
        photos={photos}
        setPhotos={setPhotos}
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

