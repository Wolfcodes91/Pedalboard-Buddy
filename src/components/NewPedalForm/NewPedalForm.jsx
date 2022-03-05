import { useState } from "react";
// import * as pedalsAPI from "../../utilities/pedals-api" 

export default function NewPedalForm({ pedalsList, setPedalsList }) {
    const [formData, setFormData] = useState({
        brand: "",
        name: "",
        size: "",
    })
      const [newPedal, setNewPedal] = useState({})

      function handleAddNewPedal(evt) {
        //   const pedal = pedalsAPI.newPedalCreate()
          evt.preventDefault();
          setNewPedal(formData)
          console.log(newPedal)
          setFormData({ brand: "", name: "", size: "medium" });
      }

      function handleChange(evt) {
        evt.preventDefault();
        setFormData({ ...formData, [evt.target.brand]: evt.target.value, [evt.target.name]: evt.target.value});
        console.log(formData)
      }

    return (
        <>
        <h1>Add a Pedal</h1>
        <form onSubmit={handleAddNewPedal}>
            <input type="text" placeholder="Brand" value={formData.brand} onChange={handleChange}/>
            <input type="text" placeholder="Name" value={formData.name} onChange={handleChange}/>
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