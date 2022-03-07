import PedalList from "../../components/PedalList/PedalList"

export default function BoardPage({ createPedal, pedalsList, setPedalsList, handleSelectPedal, activePedal, deletePedal }) {
    return (
        <>
        <h1>board page</h1>

        <PedalList 
        deletePedal={deletePedal}
        createPedal={createPedal} 
        pedalsList={pedalsList} 
        setPedalsList={setPedalsList}
        handleSelectPedal={handleSelectPedal}
        activePedal={activePedal}
        />
        </>
    )
}