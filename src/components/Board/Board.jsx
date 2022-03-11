import "./Board.css"
import { useState, useEffect } from "react"
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
    activeDiv,
    setActiveDiv,
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
                            className={`boardItem${index} ${boardSpot[index] === activeDiv ? ' selected' : ''}`}
                            onClick={() => handleSelectDiv(b, index)}>
                            {boardSpot[index].length ?
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