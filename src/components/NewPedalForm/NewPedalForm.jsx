import "./NewPedalForm.css"
import { useState } from "react";

export default function NewPedalForm({ createPedal }) {
    
    const [formData, setFormData] = useState({
        brand: "",
        name: "",
        size: "regular",
    })
    
    function handleAddNewPedal(evt) {
      evt.preventDefault()
      console.log(formData)
      createPedal(formData)
      setFormData({ brand: "", name: "", size: "regular" });
      
      }

      function handleChange(evt) {
          console.log(evt.target.name)
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
            <select name="size" value={formData.size} onChange={(evt)=>handleChange(evt)}>
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