import { useState } from "react";
import * as pedalsAPI from "../../utilities/pedals-api" 

export default function NewPedalForm({ createPedal }) {
    
    const [formData, setFormData] = useState({
        brand: "",
        name: "",
        size: "",
    })
    
    function handleAddNewPedal(evt) {
      evt.preventDefault()
      createPedal(formData)
      setFormData({ brand: "", name: "", size: "medium" });
      
      }

      function handleChange(evt) {
        setFormData({ ...formData,[evt.target.name]: evt.target.value});
      }

    return (
        <>
        <h1>Add a Pedal</h1>
        <form onSubmit={handleAddNewPedal}>
            <input name="brand" type="text" placeholder="Brand" value={formData.brand} onChange={handleChange}/>
            <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange}/>
            <select name="size" value={formData.size} onChange={handleChange}>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </select>
            <button type="submit">Add New Pedal</button>
        </form>
        </>
    )
}