import "./Pedal.css"
import { Draggable } from "react-beautiful-dnd"

export default function Pedal({ 
    pedal, 
    isSelected, 
    handleSelectPedal, 
    deletePedal, 
    activePedal, 
    setPedalToUpdate, 
    setPedalForm, 
    setEditData,
    index,
    id,
    }) 
    {

    function handleDeletePedal(id) {
        deletePedal(id)
    }

    function handleUpdatePedalForm(id) {
        console.log('click', pedal)
        setPedalForm(false)
        setPedalToUpdate(activePedal)
        setEditData(pedal)
    }

    return(
        <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
        <div
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={{ backgroundImage: `url(${pedal.photo})` }} 
        className={`pedal${isSelected ? ' selected' : ''}`} 
        // onClick={() => handleSelectPedal(pedal)}
        >
            <div className="pedalInfoBox">
            <p>{pedal.brand}</p>
            <p>{pedal.name}</p>
            </div>
            <div className="pedalButtonBox">
            <button className="updateButton" onClick={handleUpdatePedalForm}>Edit</button>
            <button className="dltButton" onClick={() => handleDeletePedal(pedal._id)}>Delete</button>
            </div>
        </div>
        )}
        </Draggable>
    );
}