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
        
        function moveToBoard() {
            let destBoard = result.destination.droppableId
            if(boardSpot[destBoard].length) return 
            const removed = pedalsList.splice(source.index, 1)
            boardSpot.splice(destBoard, 1, removed)
            setPedalsList(pedalsList)
            setBoardSpot(boardSpot)
            console.log(result.draggableId, boardSpot, 'boop')
        }
        // function moveToList() {
        //     let destList = result.destination.droppableId
        //     const removed = boardSpot.splice(source.index, 1)
        //     boardSpot.splice(destBoard, 1, removed)
        //     setPedalsList(pedalsList)
        //     setBoardSpot(boardSpot)
        //     console.log(result.draggableId, boardSpot, 'boop')
        // }

        function moveInList() {
            const [reorderedItem] = pedalsList.splice(result.source.index, 1);
            pedalsList.splice(result.destination.index, 0, reorderedItem)
            setPedalsList(pedalsList)
            console.log(result, 'bop') 
        }
        
        function moveWithinBoard() {
            console.log(result)
            const [reorderedBoardItem] = boardSpot.splice(result.source.index, 1);
            console.log(reorderedBoardItem)
            boardSpot.splice(result.destination.index, 0, reorderedBoardItem)
            // const newSpot = boardSpot.map((spot, index) => result.destination.index === index ? result : spot )
            setBoardSpot(boardSpot)
            console.log(result, boardSpot, 'beep')
        }
        
        if (source.droppableId !== destination.droppableId && source.droppableId === 'pedalsList') {
            moveToBoard(result, source, destination)
           
        } else if (source.droppableId !== destination.droppableId) {
            moveWithinBoard()
        }
        else {
            moveInList()
        }
        setCount(count + 1)
    }
    return (
        <div className="boardPage">
            <button className="saveBoardBtn">Save Board</button>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Board
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
