import React from 'react'
import ListItem from './ListItem'


const Content = ({items,handleCheck,removeItem}) => {
  return (
    <main>
      {(items && items.length) ? (
        <ul>
          {items.map((item)=>(
            <ListItem
              item={item}
              key={item.id}
              handleCheck={handleCheck}
              removeItem={removeItem}
            />
          ))}
        </ul> )
        :(<b>Your List is Empty</b>)
      }
    </main>
  )
}

export default Content