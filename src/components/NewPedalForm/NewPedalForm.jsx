import "./NewPedalForm.css"
import { useState } from "react";

export default function NewPedalForm({ createPedal, activePedal, pedalToUpdate, pedalForm, setPedalForm, editData, setEditData }) {
   
    const [formData, setFormData] = useState({
        brand: "",
        name: "",
        size: "regular",
    })
    
    function handleAddNewPedal(evt) {
      evt.preventDefault()
      createPedal(formData)
      setFormData({ brand: "", name: "", size: "regular" });
      }

    function handleUpdatePedal() {
        setPedalForm(true)
    }

      function handleChange(evt) {
        setFormData({ ...formData,[evt.target.name]: evt.target.value});
      }
      function handleEdit(evt) {
        setEditData({ ...editData,[evt.target.name]: evt.target.value});
      }

    return (
        <>
        { pedalForm ?
        <div className="newPedalForm">
        <h1>Add a Pedal</h1>
        <form onSubmit={handleAddNewPedal}>
            <input 
            name="brand"
            type="text" 
            placeholder="Brand" 
            value={formData.brand} 
            onChange={handleChange}
            />
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
        :
        <div>
        <h1>Edit a Pedal</h1>
        <form onSubmit={handleUpdatePedal}>
            <input 
            name="brand"
            type="text" 
            placeholder={pedalToUpdate ? pedalToUpdate.brand : "Brand"} 
            value={editData.brand} 
            onChange={handleEdit}
            />
            <br />
            <input name="name" type="text" placeholder="Name" value={editData.name} onChange={handleEdit}/>
            <br />
            <select name="size" value={editData.size} onChange={(evt)=>handleEdit(evt)}>
                <option value="mini">Mini</option>
                <option value="regular">Regular</option>
                <option value="doublewide">Double Wide</option>
                <option value="wah/volume">Wah/Volume</option>
            </select>
            <button type="submit">Save Pedal Changes</button>
        </form>

        </div>
    }
    </>
    )
}