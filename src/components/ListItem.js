import React, { useState } from 'react'
import {FaTrashAlt} from 'react-icons/fa'

const ListItem = ({ item, handleCheck, removeItem, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.item);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== item.item) {
      handleEdit(item.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      // cancel edit
      setIsEditing(false);
      setEditText(item.item);
    }
  };

  return (
    <li className='item'>
      {isEditing ? (
        <input
          autoFocus
          type='text'
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <input
            type='checkbox'
            onChange={() => handleCheck(item.id)}
            checked={item.checked}
          />
          <label
            style={item.checked ? { textDecoration: 'line-through' } : null}
            onDoubleClick={() => {
              if (!item.checked) setIsEditing(true);
            }}
          >
            {item.item}
          </label>
        </>
      )}

      {/* show delete/exit icon only for active (unchecked) items and when not editing */}
      {!item.checked && !isEditing && (
        <FaTrashAlt
          role='button'
          tabIndex='0'
          onClick={() => removeItem(item.id)}
        />
      )}
    </li>
  )
}

export default ListItem