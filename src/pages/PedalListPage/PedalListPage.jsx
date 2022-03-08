import Pedal from "../../components/Pedal/Pedal";
import NewPedalForm from "../../components/NewPedalForm/NewPedalForm";
import { useState } from "react";

export default function PedalListPage({ createPedal, pedalsList, handleSelectPedal, activePedal, deletePedal, updatePedal }) {
        const [showForm, setShowForm] = useState(false)
        const pedals = pedalsList.map(p =>
            <Pedal
              pedal={p}
              key={p._id}
              isSelected={p === activePedal} 
              handleSelectPedal={handleSelectPedal}
              deletePedal={deletePedal}
              updatePedal={updatePedal}
              showForm={showForm}
              setShowForm={setShowForm}
            />
        );
    
        return (
            <div className="pedalList">
            <h1>Pedals</h1>
            {showForm ? <NewPedalForm/> : ''}
            {pedals.length ?
            pedals
            :
            <span className="no-pedals">No Pedals</span>
          }
            </div>
        )
    }

