import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';


function App() {
  const [item, setItem] = useState('');
  const [itemlist, setItemlist] = useState([]);

  const onitemchange = (e) => {
    setItem(e.target.value);
  };

  const onadditem = () => {
    if (item.trim() === '') return; 
    setItemlist([...itemlist, { id: uuid(), item ,checked : false }]); 
    setItem('');
  };

  const oncheckboxchange = (id) => {
    const updatedList = itemlist.map((items) => {
      if (items.id === id) {
        return { ...items, checked: !items.checked }; 
      }
      return items;
    });
    setItemlist(updatedList);
  };

  const ondeleteitem = (id) => {
    const updatedList = itemlist.filter((items) => items.id !== id);
    setItemlist(updatedList);
  };
  return (
    <div className="App">
      <h1>My WishList</h1>
      <div className='search-box'>
          <input value={item} onChange={onitemchange} type="text" placeholder="Add your WishList........." />
          <button className='button' onClick={onadditem}>Add</button>
      </div>
      <div className='items-list'>
        {
          itemlist?.length > 0 && itemlist.map((items) => (
            <div key={items.id} className='item'>
              <label>
                <input onChange={() => oncheckboxchange(items.id)} type="checkbox" />
                <span className={items.checked ? 'checked' : ''}>{items.item}</span>
                <button className='button' onClick={() => ondeleteitem(items.id)}>Delete</button>
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
