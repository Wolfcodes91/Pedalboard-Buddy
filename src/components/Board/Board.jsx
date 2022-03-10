import "./Board.css"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

export default function Board({handleOnDragEnd, boardSpot, setBoardSpot}) {
    return (
    <div className="board">
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dropPedals">
        {(provided) => (
        boardSpot.map((b, index) =>(
        <div key={index} className={`boardItem${index}`} 
        {...provided.droppableProps} ref={provided.innerRef}>
        {provided.placeholder}   
        </div>
        ))
        )}
        </Droppable>
    </DragDropContext>
    </div>
   )
}