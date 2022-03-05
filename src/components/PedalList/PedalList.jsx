import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"


export default function PedalList({ pedalsList, setPedalsList }) {



    return (
        <>
        <h1>Pedal List</h1>
        <NewPedalForm pedalsList={pedalsList} setPedalsList={setPedalsList} />
        <Pedal />
        </>
    )
}