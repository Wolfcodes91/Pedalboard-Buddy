import "./NewPedalForm.css"
import { useState } from "react";

export default function NewPedalForm({ createPedal }) {
    
    const [formData, setFormData] = useState({
        brand: "",
        name: "",
        size: "",
    })
    
    function handleAddNewPedal(evt) {
      evt.preventDefault()
      createPedal(formData)
      setFormData({ brand: "", name: "", size: "regular" });
      
      }

      function handleChange(evt) {
        setFormData({ ...formData,[evt.target.name]: evt.target.value});
      }

    return (
        <div className="newPedalForm">
        <h1>Add a Pedal</h1>
        <form onSubmit={handleAddNewPedal}>
            <input name="brand" type="text" placeholder="Brand" value={formData.brand} onChange={handleChange}/>
            <br />
            <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange}/>
            <br />
            <select name="size" value={formData.size} onChange={handleChange}>
                <option value="mini">Mini</option>
                <option value="regular">Regular</option>
                <option value="doublewide">Double Wide</option>
                <option value="wah/volume">Wah/Volume</option>
            </select>
            <button type="submit">Add New Pedal</button>
        </form>
        </div>
    )
}