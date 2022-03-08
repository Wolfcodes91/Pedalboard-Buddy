import NewPedalForm from "../NewPedalForm/NewPedalForm"
import Pedal from "../Pedal/Pedal"

import "./PedalList.css"

export default function PedalList({ createPedal, pedalsList, handleSelectPedal, activePedal, deletePedal, user, updatePedal }) {
    const pedals = pedalsList.map(p =>
        <Pedal
          deletePedal={deletePedal}
          user={user}
          pedal={p}
          key={p._id}
          isSelected={p === activePedal} 
          handleSelectPedal={handleSelectPedal}
          updatePedal={updatePedal}
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