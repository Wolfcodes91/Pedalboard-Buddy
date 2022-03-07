import Pedal from "../../components/Pedal/Pedal";

export default function PedalListPage({ createPedal, pedalsList, handleSelectPedal, activePedal }) {
        const pedals = pedalsList.map(p =>
            <Pedal
              pedal={p}
              key={p._id}
              isSelected={p === activePedal} 
              handleSelectPedal={handleSelectPedal}
            />
        );
    
        return (
            <div className="pedalListPage">
            <h1>Pedals</h1>
            {pedals.length ?
            pedals
            :
            <span className="no-pedals">No Pedals</span>
          }
            </div>
        )
    }

