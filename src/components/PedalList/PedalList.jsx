import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"
import { useState } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import "./PedalList.css"

export default function PedalList({
  createPedal,
  handleSelectPedal,
  activePedal,
  deletePedal,
  user,
  updatePedal,
  handleUpload,
  photos,
  setPhotos,
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
    <div className="pedalList"
    style={{ backgroundImage: `url(Photos/Floor.jpeg)` }}
    >
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
        user={user}
      />
      <Droppable droppableId="pedalsList">
        {(provided) => (
          <div className="pedalListItems" 
          {...provided.droppableProps} ref={provided.innerRef}
          >
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
                        index={index}
                        id={p._id}
                        setEditData={setEditData}
                        editData={editData}
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

