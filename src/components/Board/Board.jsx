import "./Board.css"
import { Droppable, Draggable } from "react-beautiful-dnd"
import Pedal from "../Pedal/Pedal"




export default function Board({
    handleOnDragEnd,
    boardSpot,
    setBoardSpot,
    deletePedal,
    user,
    activePedal,
    updatePedal,
    pedalToUpdate,
    pedalsList,
    setPedalForm,
    handleUpload,
    photos,
    setPhotos,
    setEditData,
    handleSelectDiv,
    pedal,
    pedalForm,
    isSelected, 
    handleSelectPedal, 
    setPedalToUpdate, 
    index,
    id,
    p,
}) {



    return (
        <div className="board">
            {boardSpot.map((b, index) => (
                <Droppable droppableId={`${index}`} key={index}>
                    {(provided) => (
                        <div
                            value={index}
                            {...provided.droppableProps} ref={provided.innerRef}
                            className={`boardItem${index}`}>
                            {boardSpot[index].brand ?
                            
                            <Draggable key={b.index} draggableId={index.toString()} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Pedal 
                            deletePedal={deletePedal}
                            user={user}
                            p={b}
                            key={b._id}
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
                            id = {b.boardId}
                            />
                             </div>
                            )}
                            </Draggable>
                                :
                                'no pedal'
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))
            }
        </div>
    )
}