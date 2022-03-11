import "./BoardPage.css"
import PedalList from "../../components/PedalList/PedalList"
import Board from "../../components/Board/Board"
import { DragDropContext } from 'react-beautiful-dnd'
import { useState } from "react"

export default function BoardPage({
    createPedal,
    pedalsList,
    setPedalsList,
    handleSelectPedal,
    activePedal,
    deletePedal,
    updatePedal,
    photos,
    setPhotos,
    boardSpot,
    setBoardSpot,
    handleSelectDiv,
}) {
    const [count, setCount] = useState(0)
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const destBoard = parseInt(destination.droppableId)
            if(boardSpot[destBoard].length) return 
            const removed = pedalsList.splice(source.index, 1)
            boardSpot.splice(destBoard, 1, removed)
            setBoardSpot(boardSpot)
            setPedalsList(pedalsList)
            console.log(removed, destBoard, pedalsList, boardSpot)
        } else {
            const items = Array.from(pedalsList);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)
            setPedalsList(items)
            console.log(result, items, 'drag end')
        }
        setCount(count + 1)
    }
    return (
        <div className="boardPage">
            <button className="saveBoardBtn">Save Board</button>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Board
                    handleOnDragEnd={handleOnDragEnd}
                    boardSpot={boardSpot}
                    setBoardSpot={setBoardSpot}
                    pedalsList={pedalsList}
                    handleSelectDiv={handleSelectDiv}
                />
                <PedalList
                    deletePedal={deletePedal}
                    createPedal={createPedal}
                    pedalsList={pedalsList}
                    setPedalsList={setPedalsList}
                    handleSelectPedal={handleSelectPedal}
                    activePedal={activePedal}
                    updatePedal={updatePedal}
                    photos={photos}
                    setPhotos={setPhotos}
                />
            </DragDropContext>
        </div>
    )
}
