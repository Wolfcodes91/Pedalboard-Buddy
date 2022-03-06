import "./Pedal.css"

export default function Pedal({ pedal, isSelected, handleSelectPedal }) {
    return(
    <div className={`pedal${isSelected ? ' selected' : ''}`} onClick={() => handleSelectPedal(pedal)}>
    <ul>
        <p>{pedal.brand}</p>
        <p>{pedal.name}</p>
    </ul>
    </div>
    )
}