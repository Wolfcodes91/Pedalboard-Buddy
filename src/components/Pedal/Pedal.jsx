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
    <div className={`pedal${isSelected ? ' selected' : ''}`} onClick={() => handleSelectPedal(pedal)}>
    <ul>
        <p>{pedal.brand}</p>
        <p>{pedal.name}</p>
        <button className="updateButton" onClick={handleUpdatePedalForm}>Edit Pedal</button>
        <button className="dltButton" onClick={() => handleDeletePedal(pedal._id)}>Delete Pedal</button>
    </ul>
    <section className="flex-ctr-ctr">
        <input type="file" ref={fileInputRef} />
        <button onClick={handleUpload}>Upload Photo</button>
      </section>
      <section>
        {photos.map(p => <PhotoCard photo={p} key={p._id} />)}
      </section>
    </div>
    )
}