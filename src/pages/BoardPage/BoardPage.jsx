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
    handleSelectDiv,
    activeDiv,
    setActiveDiv
}) {
    function handleOnDragEnd(result, boardSpot) {
        if (!result.destination) return;
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const destBoard = destination.droppableId
            const sourceItems = Array.from(pedalsList);
            const destItems = Array.from(boardSpot)
            const [removed] = sourceItems.splice(source.index, 1)
            console.log([removed], destBoard, sourceItems, destItems)
            destItems.splice(destination.index, 0, removed)
            setBoardSpot({
                ...boardSpot,
                [source.droppableId]: {
                    ...sourceItems, sourceItems
                },
                [destination.droppableId]: {
                    ...destBoard, destItems
                }
            })
        } else {
            const items = Array.from(pedalsList);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)
            setPedalsList(items)
            console.log(result, items, 'drag end')
        }
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
                    activeDiv={activeDiv}
                    setActiveDiv={setActiveDiv}
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
