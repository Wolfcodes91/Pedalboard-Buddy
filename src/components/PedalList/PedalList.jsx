import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
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
          <Droppable droppableId="pedalsList">
          {(provided) => (

          <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
          {pedalsList.length === 0 && <span className="no-pedals">No Pedals</span>}
          {pedalsList.map((pedal, index) => {
            return (
              <Draggable key={pedal._id} draggableId={pedal._id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Pedal 
                     deletePedal={deletePedal}
                     user={user}
                     pedal={pedal}
                     key={pedal._id}
                     isSelected={pedal === activePedal} 
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
                     id = {pedal._id}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>


        

          )}
          </Droppable>
        </DragDropContext>
        </div>
    )
}




// <div {...provided.droppableProps} ref={provided.innerRef}>
       
        