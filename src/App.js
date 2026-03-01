import Header from './components/Header';
import SearchItem from './components/Search';
import AddItem from './components/AddItem';
import AddTopic from './components/AddTopic';
import TopicSelector from './components/TopicSelector';
import Content from './components/Content';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';


function App() {

  // array of todo lists; each list has {id, topic, items:[{id,checked,item}]}
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem('todo_lists')) || []
  );
  const [currentListId, setCurrentListId] = useState(
    lists.length ? lists[0].id : null
  );
  const [newItem, setNewItem] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [search, setSearch] = useState('');

  // on mount, if lists are in storage, rehydrate and set current id
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todo_lists'));
    if (stored && stored.length) {
      setLists(stored);
      setCurrentListId(stored[0].id);
    }
  }, []);

  // persist any change to lists
  useEffect(() => {
    localStorage.setItem('todo_lists', JSON.stringify(lists));
  }, [lists]);

  // helpers to locate and update current list
  const getCurrentList = () =>
    lists.find((l) => l.id === currentListId) || { items: [] };

  const updateCurrentList = (updated) => {
    setLists(
      lists.map((l) => (l.id === currentListId ? updated : l))
    );
  };

  const addItem = (text) => {
    if (!currentListId) return;
    const current = getCurrentList();
    const id = current.items.length
      ? current.items[current.items.length - 1].id + 1
      : 1;
    const newItemObj = { id, checked: false, item: text };
    updateCurrentList({ ...current, items: [...current.items, newItemObj] });
  };

  const handleCheck = (id) => {
    const current = getCurrentList();
    const items = current.items.map((it) =>
      it.id === id ? { ...it, checked: !it.checked } : it
    );
    updateCurrentList({ ...current, items });
  };

  const handleDelete = (id) => {
    const current = getCurrentList();
    const items = current.items.filter((it) => it.id !== id);
    updateCurrentList({ ...current, items });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  // edit todo text
  const handleEdit = (id, updatedText) => {
    const current = getCurrentList();
    const items = current.items.map((it) =>
      it.id === id ? { ...it, item: updatedText } : it
    );
    updateCurrentList({ ...current, items });
  };

  // topic/list management
  const addList = (topic) => {
    const id = lists.length ? lists[lists.length - 1].id + 1 : 1;
    const newList = { id, topic, items: [] };
    const newLists = [...lists, newList];
    setLists(newLists);
    setCurrentListId(id);
  };

  const selectList = (id) => {
    setCurrentListId(id);
  };

  const removeList = (id) => {
    const remaining = lists.filter((l) => l.id !== id);
    setLists(remaining);
    if (currentListId === id) {
      setCurrentListId(remaining.length ? remaining[0].id : null);
    }
  };

  const current = getCurrentList();
  const displayedItems = current.items.filter((it) =>
    it.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Header title={current.topic || "Todo Lists"} />
      <TopicSelector
        lists={lists}
        currentId={currentListId}
        setCurrentList={selectList}
        removeList={removeList}
      />
      <AddTopic
        newTopic={newTopic}
        setNewTopic={setNewTopic}
        handleSubmit={(e) => {
          e.preventDefault();
          if (newTopic.trim()) {
            addList(newTopic.trim());
            setNewTopic('');
          }
        }}
      />
      {currentListId ? (
        <>
          <AddItem
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
          />
          <SearchItem search={search} setSearch={setSearch} />
          <main>
            <Content
              items={displayedItems}
              handleCheck={handleCheck}
              removeItem={handleDelete}
              handleEdit={handleEdit}
            />
          </main>
          <Footer length={current.items.length} />
        </>
      ) : (
        <main>
          <b>No topics defined – add one above.</b>
        </main>
      )}
    </div>
  );
}

export default App;