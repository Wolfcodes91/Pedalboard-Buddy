import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"
import { useState } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
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
    setPedalsList,
    }) 
    {
    const [editData, setEditData] = useState({
        brand: "",
        name: "",
        size: "regular",
    })  
    const [pedalToUpdate, setPedalToUpdate] = useState()
    const [pedalForm, setPedalForm] = useState(true) 
    function handleOnDragEnd(result) {
      if (!result.destination) return;
      const items = Array.from(pedalsList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem )
      setPedalsList(items)
      console.log(result, items, reorderedItem)
    } 
    const pedals = pedalsList.map((p, index) =>
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
          index={index}
          id = {p._id}
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="dropPedals">
          {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
          {pedals.length ?
          pedals
          :
          <span className="no-pedals">No Pedals</span>
        }
            {provided.placeholder}
          </div>
          )}
          </Droppable>
        </DragDropContext>
        </div>
    )
}