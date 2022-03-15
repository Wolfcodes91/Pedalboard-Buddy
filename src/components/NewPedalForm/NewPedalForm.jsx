import "./NewPedalForm.css"
import { useState, useRef } from "react";

export default function NewPedalForm({ 
    createPedal,
     pedalToUpdate, 
     pedalForm, 
     setPedalForm, 
     updatePedal,
     editData,
     setEditData,
     user
    }) {
   
    const [formData, setFormData] = useState({
        brand: "",
        name: "",
        size: "regular",
    })

    // Use a ref prop on the <input> in the JSX to
    // create a reference to the <input>, i.e.,
    // inputRef.current will be the <input> DOM element
    const fileInputRef = useRef();
    const fileChangeRef = useRef();
    
    function handleAddNewPedal(evt) {
      console.log(user)
      evt.preventDefault()
      const form = new FormData();
      form.append('photo', fileInputRef.current.files[0]);
      form.append('brand', formData.brand);
      form.append('name', formData.name);
      form.append('size', formData.size);
      form.append('user', user._id)
      createPedal(form)
      setFormData({ brand: "", name: "", size: "regular"});
      fileInputRef.current.value = '';
      console.log('handleAdd')
      }

    function handleUpdatePedal(evt) {
      evt.preventDefault()
      console.log(editData)
      const form = new FormData();
      if (fileChangeRef.current.files.length) form.append('photo', fileChangeRef.current.files[0]);
      form.append('brand', editData.brand);
      form.append('name', editData.name);
      form.append('size', editData.size);
      console.log('handleUpdate', form)
      setPedalForm(true)
      updatePedal(form, pedalToUpdate._id)
      setEditData({ brand: "", name: "", size: "regular"});
      fileChangeRef.current.value = null
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
        <object className="logo2" type="image/svg+xml" data="Photos/pedalboard-buddy-1.svg"></object>
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
            <input className="chooseFileButton" type="file" ref={fileInputRef} />
            <button className="submitButton" type="submit">Add New Pedal</button>
        </form>
        </div>
        :
        <div  className="newPedalForm">
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
            <input className="chooseFileButton" name="photo" ref={fileChangeRef} type="file" />
            <button className="submitButton" type="submit">Save Pedal Changes</button>
        </form>
        </div>
      }
    </>
    )
}