import Header from './components/Header';
import SearchItem from './components/Search';
import AddItem from './components/AddItem';
import Content from './components/Content';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';


function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todo_list"))||[]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {

    const fetchItems = () => {
      JSON.parse(localStorage.getItem('todo-list'))
    }

    setTimeout(() => fetchItems(), 2000);

  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length-1].id+1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    localStorage.setItem("todo_list",JSON.stringify(items))
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    localStorage.setItem("todo_list",JSON.stringify(myItem))
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem("todo_list",JSON.stringify(listItems))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        <Content
          items={items}
          handleCheck={handleCheck}
          removeItem={handleDelete}
        />
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;