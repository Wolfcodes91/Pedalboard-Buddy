import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"

import "./PedalList.css"

export default function PedalList({ createPedal, pedalsList, setPedalsList }) {
    const pedals = pedalsList.map(p =>
        <Pedal
          pedal={p}
          key={p._id}
        />
    );

    return (
        <div className="pedalList">
        <h1>Pedal List</h1>
        <NewPedalForm createPedal={createPedal}/>
        
        {pedals.length ?
        pedals
        :
        <span className="no-pedals">No Pedals</span>
      }
        </div>
    )
}