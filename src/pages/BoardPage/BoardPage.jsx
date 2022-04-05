import "./BoardPage.css"
import PedalList from "../../components/PedalList/PedalList"
import Board from "../../components/Board/Board"
import LoginModal from "../../components/LoginModal/LoginModal"
import NavBar from "../../components/NavBar/NavBar"
import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useEffect } from "react"
import * as pedalsAPI from "../../utilities/pedals-api"
import * as boardsAPI from "../../utilities/boards-api"
import { useToast } from '@chakra-ui/react'


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
    updateBoard,
    isOpen,
    onOpen,
    onClose, 
    cancelRef,
    handleClearBoard
}) {
    let boardToFind = '';
    const toast = useToast()
    let id = 'test-toast'
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
    }, [setActivePedal, setPedalsList])

    useEffect(function () {
        if (!user) {
            return
        }
        async function getBoards() {
            const boards = await boardsAPI.getAll();
            setUserBoards(boards)
        }
        getBoards()
    }, [user, setUserBoards])

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
        if (!user) {
            onOpen()
            evt.preventDefault()
            return 
        }
        if (user) {
        evt.preventDefault()
        const form = {
            name: boardFormData.name,
            layout: boardSpot,
            user: user,
        }
        createPedalboard(form)
        console.log(id)
        setBoardFormData({ name: "" });
        toast(
            {
                id,
                title: 'Pedalboard Saved.',
                description: "Your Pedalboard has been successfully saved",
                status: 'success',
                duration: 5000,
                isClosable: true,
                },  
        )
        }
    }

    function handleBoardChange(evt) {
        setBoardFormData({ ...boardFormData, [evt.target.name]: evt.target.value });
    }

    function chooseBoard(evt) {
        if (boardToFind === '' || boardToFind === undefined) {
            if (userBoards[0] === null) return
            else boardToFind = userBoards[0]
        }
        setChosenBoard(boardToFind)
        setBoardSpot(boardToFind.layout)
    }

    function handleUserBoardChange(evt) {
        boardToFind = userBoards[evt.target.options.selectedIndex]
        chooseBoard()
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
        toast(
            {
                id,
                title: 'Pedalboard Saved.',
                description: "Your Pedalboard has been successfully updated",
                status: 'success',
                duration: 5000,
                isClosable: true,
                },  
        )
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
                        <select className="select" onChangeCapture={handleUserBoardChange}>
                            {Array.isArray(userBoards) && userBoards.map(option => {
                                return <option
                                    value={option._id}
                                    key={option._id}
                                    name={option.name}>
                                    {option.name}</option>;
                            })}
                        </select>
                    </span>
                </form>

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
                        <form onSubmit={handleSavePedalboard}>
                            <span>
                                <div className="form5">
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Name your Board"
                                    value={boardFormData.name}
                                    onChange={handleBoardChange}
                                />
                                <button className="saveBoardBtn" type="submit">Save New Board</button>
                                </div>
                            </span>
                        </form>
                }
            </div>
        
            <LoginModal 
                user={user}
                setUser={setUser}
                boardSpot={boardSpot}
                setBoardSpot={setBoardSpot}
                isOpen={isOpen}
                canelRef={cancelRef}
                onClose={onClose}
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
                    onOpen={onOpen}
                />
            </DragDropContext>
        </div>
    )
}
