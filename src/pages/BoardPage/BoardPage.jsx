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
            let destBoard = parseInt(result.destination.droppableId)
            if(boardSpot[destBoard].brand) return 
            const removed = pedalsList[source.index]
            const newPedalsList = [
                ...pedalsList.filter((p, index)=> index!==source.index),
            ]
            let newBoardSpot = [...boardSpot]
            newBoardSpot[destBoard] = removed
            setPedalsList(newPedalsList)
            setBoardSpot(newBoardSpot)
            console.log(result.draggableId, newBoardSpot, 'boop')
        }
        function moveToList() {
            // let destList = result.destination.droppableId
            const removed = boardSpot.splice(source.index, 1)
            pedalsList.splice(pedalsList, 1, removed)
            // setPedalsList(pedalsList)
            // setBoardSpot(boardSpot)
            console.log(result.draggableId, boardSpot, pedalsList, 'borp')
        }

        function moveInList() {
            const [reorderedItem] = pedalsList.splice(result.source.index, 1);
            pedalsList.splice(result.destination.index, 0, reorderedItem)
            setPedalsList(pedalsList)
            console.log(pedalsList, 'bop') 
        }
        
        function moveWithinBoard() {
            console.log(result)
            const [reorderedBoardItem] = boardSpot.splice(result.source.index, 1);
            // const reorderedBoardItem = [
            // ...boardSpot.filter((b, index)=> index ===source.index)
            // ]
            console.log(reorderedBoardItem)
            let newBoardSpot = [...boardSpot]
            // newBoardSpot[result.destination.index] = reorderedBoardItem
            newBoardSpot.splice(result.destination.droppableId, 0, reorderedBoardItem)
            // const newSpot = boardSpot.map((spot, index) => result.destination.index === index ? result : spot )
            setBoardSpot(newBoardSpot)
            console.log(result, newBoardSpot, 'beep')
        }
        
        if (source.droppableId !== destination.droppableId && source.droppableId === 'pedalsList') {
            moveToBoard(result, source, destination)
            }
            else if (source.droppableId === destination.droppableId && source.droppableId === 'pedalsList'){
                moveInList()
            }
            else if (source.droppableId !== destination.droppableId && destination.droppableId === 'pedalsList') {
                moveToList()
            }
            else if (source.droppableId !== destination.droppableId) {
            moveWithinBoard()
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
