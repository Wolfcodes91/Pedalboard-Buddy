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
            console.log('boop')
        }
        function moveToList() {
            const removed = boardSpot[source.index]
            let newList = [...pedalsList, removed]
            boardSpot[source.index] = {}
            setPedalsList(newList)
            setBoardSpot(boardSpot)
            console.log('borp')
        }

        function moveInList() {
            const [reorderedItem] = pedalsList.splice(result.source.index, 1);
            pedalsList.splice(result.destination.index, 0, reorderedItem)
            setPedalsList(pedalsList)
            console.log('bop') 
        }
        
        function moveWithinBoard() {
            const [reorderedBoardItem] = boardSpot.splice(result.source.index, 1);
            let newBoardSpot = [...boardSpot]
            newBoardSpot.splice(result.destination.droppableId, 0, reorderedBoardItem)
            setBoardSpot(newBoardSpot)
            console.log(newBoardSpot, 'beep')
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
            <div className="saveButtonDiv">
            <button className="saveBoardBtn">Save Board</button>
            </div>
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
