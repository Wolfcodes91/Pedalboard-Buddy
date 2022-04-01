import "./BoardPage.css"
import PedalList from "../../components/PedalList/PedalList"
import Board from "../../components/Board/Board"
import LoginModal from "../../components/LoginModal/LoginModal"
import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useEffect } from "react"
import * as pedalsAPI from "../../utilities/pedals-api"
import * as boardsAPI from "../../utilities/boards-api"


export default function BoardPage({
    setActivePedal,
    setUserBoards,
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
    setUser,
    userBoards,
    pedals,
    deleteBoard,
    chosenBoard,
    setChosenBoard,
    updateBoard
}) {
    let boardToFind = '';
    const [boardData, setBoardData] = useState()
    const [boardFormData, setBoardFormData] = useState({
        name: "",
    })
    const [count, setCount] = useState(0)

    useEffect(function () {
        async function getPedals() {
            const pedals = await pedalsAPI.getAll();
            setPedalsList(pedals)
            setActivePedal(pedals[0] || null);
        }
        getPedals();
    }, [])

    useEffect(function () {
        if (!user) {
            return
        }
        async function getBoards() {
            const boards = await boardsAPI.getAll();
            setUserBoards(boards)
        }
        getBoards()
    }, [user])

    useEffect(function () {
        setChosenBoard(null)
    }, [setChosenBoard, userBoards])



    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const { source, destination } = result

        function moveToBoard() {
            let destBoard = parseInt(result.destination.droppableId)
            if (boardSpot[destBoard].brand) return
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
        else if (source.droppableId === destination.droppableId && source.droppableId === 'pedalsList') {
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
        setBoardFormData({ name: "" });
    }

    function handleBoardChange(evt) {
        setBoardFormData({ ...boardFormData, [evt.target.name]: evt.target.value });
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
    function handleUpdateBoard(evt) {
        evt.preventDefault()
        console.log(boardToFind)
        chosenBoard.layout = boardSpot
        updateBoard(chosenBoard)
        console.log(chosenBoard)
    }

    function handleClearBoard(evt) {
        evt.preventDefault()
        boardSpot = [
            { number: '0' },
            { number: '1' },
            { number: '2' },
            { number: '3' },
            { number: '4' },
            { number: '5' },
            { number: '6' },
            { number: '7' },
        ]
        setBoardSpot(boardSpot)
        setChosenBoard(null)
    }

  

    return (
        <div className="boardPage"
            style={{ backgroundImage: `url(Photos/Floor.jpeg)` }}
        >
            <div className="forms">
                <form className="form1" onSubmit={chooseBoard}>
                    <span>
                        <select onChangeCapture={handleUserBoardChange}>
                            
                            {Array.isArray(userBoards) && userBoards.map(option => {
                                return <option
                                    value={option._id}
                                    key={option._id}
                                    name={option.name}>
                                    {option.name}</option>;
                            })}
                        </select>

                        <button className="chooseBoardBtn" type="submit">Choose Board</button>
                    </span>
                </form>

                <button onClick={() => setUser(1)}>LogIN</button>

                <form className="form2" onSubmit={handleClearBoard}>
                    <span>
                        <button className="clearBoardBtn" type="submit">Clear Board</button>
                    </span>
                </form>

                {chosenBoard &&
                    <form className="form3" onSubmit={handleDeleteBoard}>
                        <span>
                            <button className="deleteBoardBtn" type="submit">Delete Board</button>
                        </span>
                    </form>}

                {chosenBoard &&
                    <form className="form4" onSubmit={handleUpdateBoard}>
                        <span>
                            <button className="saveBoardBtn" type="submit">Save Changes</button>
                        </span>
                    </form>}

                {!chosenBoard &&
                    <div className="saveButtonDiv">
                        <form className="form5" onSubmit={handleSavePedalboard}>
                            <span>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Name your Board"
                                    value={boardFormData.name}
                                    onChange={handleBoardChange}
                                />
                                <button className="saveBoardBtn" type="submit">Save New Board</button>
                            </span>
                        </form>
                    </div>
                }
            </div>
            
            
            <LoginModal 
                user={user}
                setUser={setUser}
                boardSpot={boardSpot}
                setBoardSpot={setBoardSpot}
            />

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
