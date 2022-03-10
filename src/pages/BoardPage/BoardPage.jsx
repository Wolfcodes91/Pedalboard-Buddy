import "./BoardPage.css"
import PedalList from "../../components/PedalList/PedalList"
import Board from "../../components/Board/Board"

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
    handleOnDragEnd,
    boardSpot,
    setBoardSpot,
    })
    {   
    return (
        <div className="boardPage">
        <button className="saveBoardBtn">Save Board</button>
        <Board 
        handleOnDragEnd={handleOnDragEnd}
        boardSpot={boardSpot}
        setBoardSpot={setBoardSpot}
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
        </div>
     )
}
