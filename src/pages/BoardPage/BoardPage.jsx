import PedalList from "../../components/PedalList/PedalList"

export default function BoardPage({ createPedal, pedalsList, setPedalsList, handleSelectPedal, activePedal }) {
    return (
        <>
        <h1>board page</h1>

        <PedalList 
        createPedal={createPedal} 
        pedalsList={pedalsList} 
        setPedalsList={setPedalsList}
        handleSelectPedal={handleSelectPedal}
        activePedal={activePedal}
        />
        </>
    )
}