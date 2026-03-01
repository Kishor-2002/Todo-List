import React from 'react'
import ListItem from './ListItem'


const Content = ({ items, handleCheck, removeItem, handleEdit }) => {
  return (
    <main>
      {items ? (
        <ul>
          {items.map((item) => (
            <ListItem
              item={item}
              key={item.id}
              handleCheck={handleCheck}
              removeItem={removeItem}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      ) : (
        <b>Your List is Empty</b>
      )}
    </main>
  );
}

export default Content