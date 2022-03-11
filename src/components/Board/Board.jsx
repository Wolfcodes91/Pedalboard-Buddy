import "./Board.css"
import { useState } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import Pedal from "../Pedal/Pedal"



export default function Board({
    handleOnDragEnd,
    boardSpot,
    setBoardSpot,
    pedal,
    deletePedal,
    user,
    activePedal,
    handleSelectPedal,
    updatePedal,
    pedalToUpdate,
    setPedalToUpdate,
    pedalsList,
    setPedalForm,
    handleUpload,
    photos,
    setPhotos,
    setEditData,
    handleSelectDiv,
    activeDiv,
    setActiveDiv
}) {



    return (
        <div className="board">
            {boardSpot.map((b, index) => (
                <Droppable droppableId={`boardSpot${index}`} key={index}>
                    {(provided) => (
                        <div
                            value={index}
                            {...provided.droppableProps} ref={provided.innerRef}
                            className={`boardItem${index} ${boardSpot[index] === activeDiv ? ' selected' : ''}`}
                            onMouseEnter={() => handleSelectDiv(b, index)}
                        >
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))
            }
        </div>
    )
}