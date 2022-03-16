import "./Pedal.css"


export default function Pedal({
    p,
    isSelected,
    handleSelectPedal,
    deletePedal,
    setPedalToUpdate,
    setPedalForm,
    setEditData,
    user,
    // setEditData
}) {

    if (p.length) p = p[0]

    function handleDeletePedal(id) {
        deletePedal(id)
    }

    function handleUpdatePedalForm(p) {
        console.log('click', p)
        setPedalForm(false)
        setPedalToUpdate(p)
        setEditData(p)
    }
    return (
        <div
            style={{ backgroundImage: `url(${p.photo})` }}
            className={`pedal${isSelected ? ' selected' : ''}`}
            onClick={() => handleSelectPedal(p)}
        >
            <div className="pedalInfoBox">
                {/* <p>{p.brand}</p> */}
                {/* <p>{p.name}</p> */}
            </div>
            {user._id === p.user &&
                <div className="pedalButtonBox">
                    <button className="updateButton" onClick={() => handleUpdatePedalForm(p)}>Edit</button>
                    <button className="dltButton" onClick={() => handleDeletePedal(p._id)}>Delete</button>
                </div>}
        </div>
    );
}