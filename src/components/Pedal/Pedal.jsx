import "./Pedal.css"
import { Draggable } from "react-beautiful-dnd"

export default function Pedal({
    p,
    isSelected,
    handleSelectPedal,
    deletePedal,
    activePedal,
    setPedalToUpdate,
    setPedalForm,
    setEditData,
    index,
    id,
}) {

    if (p.length) p = p[0]

    function handleDeletePedal(id) {
        deletePedal(id)
    }

    function handleUpdatePedalForm(id) {
        console.log('click', p)
        setPedalForm(false)
        setPedalToUpdate(activePedal)
        setEditData(p)
    }

    return (
                <div
                    style={{ backgroundImage: `url(${p.photo})` }}
                    className={`pedal${isSelected ? ' selected' : ''}`}
                    onClick={() => handleSelectPedal(p)}
                >
                    <div className="pedalInfoBox">
                        <p>{p.brand}</p>
                        <p>{p.name}</p>
                    </div>
                    <div className="pedalButtonBox">
                        <button className="updateButton" onClick={handleUpdatePedalForm}>Edit</button>
                        <button className="dltButton" onClick={() => handleDeletePedal(p._id)}>Delete</button>
                    </div>
                </div>
    );
}