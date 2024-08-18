import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
   const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add Item</label>
        <input 
            autoFocus
            required
            ref={inputRef}
            placeholder='Add Item'
            type='text'
            id='addItem'
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
        />
        <button
            type='submit'
            aria-label='Add Item'
            onClick={()=>inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem