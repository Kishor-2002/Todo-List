import React from 'react'

const TopicSelector = ({ lists, currentId, setCurrentList, removeList }) => {
  return (
    <div className="topicSelector">
      {lists.map((l) => (
        <button
          key={l.id}
          className={l.id === currentId ? 'active' : ''}
          onClick={() => setCurrentList(l.id)}
        >
          {l.topic}
          <span
            className="removeTopic"
            onClick={(e) => {
              e.stopPropagation();
              removeList(l.id);
            }}
          >
            ×
          </span>
        </button>
      ))}
    </div>
  )
}

export default TopicSelector