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
    createPedalboard,
    user,
    userBoards
}) {
    let boardToFind = '';
    const [boardFormData, setBoardFormData] = useState({
        name: "",
    })
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
            console.log('boop', boardSpot)
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

    function handleSavePedalboard(evt) {
        evt.preventDefault()
        console.log(boardFormData, boardSpot)
        const form = {
            name: boardFormData.name,
            layout: boardSpot,
            user: user,
        }
        createPedalboard(form)
        console.log('GOOD MORNING', form)
        setBoardFormData({name: ""});
      }

    function handleBoardChange(evt) {
        setBoardFormData({ ...boardFormData,[evt.target.name]: evt.target.value});
      }
    
    function chooseBoard(evt) {
        evt.preventDefault()
        if (boardToFind === '' || boardToFind === undefined) {
            if (userBoards[0] === null) return 
            else boardToFind = userBoards[0] 
        }
        // console.log(boardToFind)
        let removedPedals = boardToFind.layout.filter(pedal => pedal.brand)
        const newPedalList = pedalsList.filter(pedal => !removedPedals.some(p => p._id === pedal._id));
        setBoardSpot(boardToFind.layout)
        console.log(removedPedals, newPedalList)
        setPedalsList(newPedalList)
    }

    function handleUserBoardChange(evt) {
        boardToFind = userBoards[evt.target.options.selectedIndex]
        
    }
    return (
        <div className="boardPage">

            <form onSubmit={chooseBoard}>
                <select onChangeCapture={handleUserBoardChange}>
                {userBoards.map(option => {
                        return <option 
                        value={option._id} 
                        key={option._id} 
                        name={option.name}>
                        {option.name}</option>;
                    })}
                </select>
            <button type="submit">Choose Board</button>
            </form>

            <div className="saveButtonDiv">
            <form onSubmit={handleSavePedalboard}>
            <input 
                name="name" 
                type="text" 
                placeholder="Name your Board" 
                value={boardFormData.name} 
                onChange={handleBoardChange}
            />
            <button className="saveBoardBtn" type="submit">Save New Board</button>
            </form>
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
