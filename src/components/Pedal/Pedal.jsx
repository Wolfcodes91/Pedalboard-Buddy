import "./Pedal.css"
import PhotoCard from "../PhotoCard/PhotoCard"

export default function Pedal({ 
    pedal, 
    isSelected, 
    handleSelectPedal, 
    deletePedal, 
    updatePedal, 
    activePedal, 
    setPedalToUpdate, 
    setPedalForm, 
    editData, 
    setEditData,
    photos,
    fileInputRef,
    handleUpload,
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
        <div style={{ backgroundImage: `url(${pedal.photo})` }} className={`pedal${isSelected ? ' selected' : ''}`} onClick={() => handleSelectPedal(pedal)}>
            <p>{pedal.brand}</p>
            <p>{pedal.name}</p>
            <button className="updateButton" onClick={handleUpdatePedalForm}>Edit</button>
            <button className="dltButton" onClick={() => handleDeletePedal(pedal._id)}>Delete</button>
        </div>
    );
}