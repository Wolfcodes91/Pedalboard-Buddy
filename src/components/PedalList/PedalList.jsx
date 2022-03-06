import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"

import "./PedalList.css"

export default function PedalList({ createPedal, pedalsList, handleSelectPedal, activePedal }) {
    const pedals = pedalsList.map(p =>
        <Pedal
          pedal={p}
          key={p._id}
          isSelected={p === activePedal} 
          handleSelectPedal={handleSelectPedal}
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