import "./Pedal.css"

export default function Pedal({ pedal, isSelected, handleSelectPedal, user, deletePedal }) {

    function handleDeletePedal(id) {
        console.log(pedal, 'click')
        deletePedal(id)
    }

    function handleUpdatePedal() {
        console.log('click')
        
    }

    return(
    <div className={`pedal${isSelected ? ' selected' : ''}`} onClick={() => handleSelectPedal(pedal)}>
    <ul>
        <p>{pedal.brand}</p>
        <p>{pedal.name}</p>
        <button className="updateButton" onClick={handleUpdatePedal}>Edit Pedal</button>
        <button className="dltButton" onClick={() => handleDeletePedal(pedal._id)}>Delete Pedal</button>
    </ul>
    </div>
    )
}