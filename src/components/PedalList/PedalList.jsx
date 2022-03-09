import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"
import { useState } from "react"

import "./PedalList.css"

export default function PedalList({ 
    createPedal, 
    pedalsList, 
    handleSelectPedal, 
    activePedal, 
    deletePedal, 
    user, 
    updatePedal,
    handleUpload,
    photos,
    setPhotos,
    }) 
    {
    const [editData, setEditData] = useState({
        brand: "",
        name: "",
        size: "regular",
    })  
 
    const [pedalToUpdate, setPedalToUpdate] = useState()
    const [pedalForm, setPedalForm] = useState(true)
    const pedals = pedalsList.map(p =>
        <Pedal
          deletePedal={deletePedal}
          user={user}
          pedal={p}
          key={p._id}
          isSelected={p === activePedal} 
          handleSelectPedal={handleSelectPedal}
          updatePedal={updatePedal}
          pedalToUpdate={pedalToUpdate}
          setPedalToUpdate={setPedalToUpdate}
          pedalForm={pedalForm}
          setPedalForm={setPedalForm}
          handleUpload={handleUpload}
          photos={photos}
          setPhotos={setPhotos}
          setEditData={setEditData}
        />
    );

    return (
        <div className="pedalList">
        <h1>Pedal List</h1>
        <NewPedalForm 
        createPedal={createPedal} 
        activePedal={activePedal} 
        pedalToUpdate={pedalToUpdate} 
        setPedalToUpdate={setPedalToUpdate}
        pedalForm={pedalForm}
        setPedalForm={setPedalForm}
        updatePedal={updatePedal}
        handleUpload={handleUpload}
        setEditData={setEditData}
        editData={editData}
        />
        
        {pedals.length ?
        pedals
        :
        <span className="no-pedals">No Pedals</span>
      }
        </div>
    )
}