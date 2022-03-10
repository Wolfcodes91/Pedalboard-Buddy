import "./BoardPage.css"
import PedalList from "../../components/PedalList/PedalList"
import Board from "../../components/Board/Board"
import { DragDropContext } from 'react-beautiful-dnd'

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
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(pedalsList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem )
        setPedalsList(items)
        console.log(result, items, reorderedItem)
          }   
    return (
        <div className="boardPage">
        <button className="saveBoardBtn">Save Board</button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
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
        </DragDropContext>
        </div>
     )
}
