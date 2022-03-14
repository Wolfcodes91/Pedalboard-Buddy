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
    userBoards,
    pedals,
    deleteBoard,
    chosenBoard,
    setChosenBoard
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
            const removed = pedals[source.index]
            let newBoardSpot = [...boardSpot]
            newBoardSpot[destBoard] = removed
            setBoardSpot(newBoardSpot)
            console.log('boop', boardSpot)
        }
        function moveToList() {
            const newBoard = [...boardSpot];
            newBoard[source.index] = {}
            setBoardSpot(newBoard)

        }

        function moveInList() {
            const [reorderedItem] = pedals.splice(result.source.index, 1);
            pedals.splice(result.destination.index, 0, reorderedItem)
            console.log('bop') 
        }
        
        function moveWithinBoard() {
            let newBoardSpot = [...boardSpot]
            let pedalSave = newBoardSpot[result.destination.droppableId];
            newBoardSpot[result.destination.droppableId] = newBoardSpot.splice(result.source.index, 1, pedalSave)[0];
            setBoardSpot(newBoardSpot)
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
        setChosenBoard(boardToFind)
        setBoardSpot(boardToFind.layout)
    }


    function handleUserBoardChange(evt) {
        boardToFind = userBoards[evt.target.options.selectedIndex]
        
    }
    function handleDeleteBoard(evt) {
        evt.preventDefault()
        deleteBoard(chosenBoard)
        handleClearBoard(evt)
    }

    function handleClearBoard(evt) {
        evt.preventDefault()
        boardSpot = [
            {number: '0'},
            {number: '1'},
            {number: '2'},
            {number: '3'},
            {number: '4'},
            {number: '5'},
            {number: '6'},
            {number: '7'},
        ]
        setBoardSpot(boardSpot)
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


                <form onSubmit={handleClearBoard}>
                <button type="submit">Clear Board</button>
            </form>

            {chosenBoard && 
                <form onSubmit={handleDeleteBoard}>
                <button type="submit">Delete Board</button>
                </form>}

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
                    user={user}
                />
                <PedalList
                    pedals={pedals}
                    boardSpot={boardSpot}
                    setBoardSpot={setBoardSpot}
                    deletePedal={deletePedal}
                    createPedal={createPedal}
                    pedalsList={pedalsList}
                    setPedalsList={setPedalsList}
                    handleSelectPedal={handleSelectPedal}
                    activePedal={activePedal}
                    updatePedal={updatePedal}
                    photos={photos}
                    setPhotos={setPhotos}
                    user={user}
                />
            </DragDropContext>
        </div>
    )
}
