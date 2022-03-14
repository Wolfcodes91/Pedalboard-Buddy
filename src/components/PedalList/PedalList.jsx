import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"
import { useState } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
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
  boardSpot,
  setBoardSpot,
  pedals
}) {
  const [editData, setEditData] = useState({
    brand: "",
    name: "",
    size: "regular",
  })
  const [pedalToUpdate, setPedalToUpdate] = useState()
  const [pedalForm, setPedalForm] = useState(true)
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
      <Droppable droppableId="pedalsList">
        {(provided) => (
          <div className="pedalListItems" {...provided.droppableProps} ref={provided.innerRef}>
           {pedals.length === 0 && <span className="no-pedals">No Pedals</span>}
            {pedals.map((p, index) => {
              return (
                <Draggable key={p._id} draggableId={p._id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Pedal
                        deletePedal={deletePedal}
                        user={user}
                        p={p}
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
                        id={p._id}

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
    </div>
  )
}

