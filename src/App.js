import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {
  const [item, setItem] = useState('');
  const [itemlist, setItemlist] = useState([]);

  
  useEffect(() => {
    const storedList = localStorage.getItem('wishlist');
    if (storedList) {
      setItemlist(JSON.parse(storedList));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(itemlist));
  }, [itemlist]);

  const onitemchange = (e) => {
    setItem(e.target.value);
  };

  const onadditem = () => {
    const newItem = item.trim();
    if (newItem === '') return;
    if (itemlist.some((i) => i.item.toLowerCase() === newItem.toLowerCase())) {
      alert('Item already exists in the wishlist!');
      return;
    }
    setItemlist([...itemlist, { id: uuid(), item: newItem, checked: false }]);
    setItem('');
  };

  const oncheckboxchange = (id) => {
    setItemlist(
      itemlist.map((items) =>
        items.id === id ? { ...items, checked: !items.checked } : items
      )
    );
  };

  const ondeleteitem = (id) => {
    setItemlist(itemlist.filter((items) => items.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onadditem();
    }
  };

  return (
    <div className="App">
      <h1>My WishList</h1>
      <div className="search-box">
        <input
          value={item}
          onChange={onitemchange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add your WishList..."
        />
        <button className="button" onClick={onadditem}>
          Add
        </button>
      </div>

      <div className="items-list">
        {itemlist.length > 0 ? (
          itemlist.map((items) => (
            <div key={items.id} className="item">
              <label>
                <input
                  type="checkbox"
                  checked={items.checked}
                  onChange={() => oncheckboxchange(items.id)}
                />
                <span className={items.checked ? 'checked' : ''}>
                  {items.item}
                </span>
                <button
                  className="button"
                  onClick={() => ondeleteitem(items.id)}
                >
                  Delete
                </button>
              </label>
            </div>
          ))
        ) : (
          <p className="empty-message">Your wishlist is empty. Add something!</p>
        )}
      </div>
    </div>
  );
}

export default App;
