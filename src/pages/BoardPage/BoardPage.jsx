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
    }) 
    {
    return (
        <div className="boardPage">
        <h1>board page</h1>
        
        <Board />
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