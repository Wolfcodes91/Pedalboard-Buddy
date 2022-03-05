import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"


export default function PedalList({ createPedal }) {



    return (
        <>
        <h1>Pedal List</h1>
        <NewPedalForm createPedal={createPedal}/>
        <Pedal />
        </>
    )
}