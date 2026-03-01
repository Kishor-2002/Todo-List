import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddTopic = ({ newTopic, setNewTopic, handleSubmit }) => {
  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor='addTopic'>New Topic</label>
        <input 
            autoFocus
            required
            ref={inputRef}
            placeholder='New Topic'
            type='text'
            id='addTopic'
            value={newTopic}
            onChange={(e)=>setNewTopic(e.target.value)}
        />
        <button
            type='submit'
            aria-label='Add Topic'
            onClick={()=>inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddTopic