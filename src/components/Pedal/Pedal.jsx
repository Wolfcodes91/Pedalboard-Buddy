import "./Pedal.css"

export default function Pedal({ pedal }) {
    return(
    <div className="pedalCard">
    <ul>
        <p>{pedal.brand}</p>
        <p>{pedal.name}</p>
    </ul>
    </div>
    )
}