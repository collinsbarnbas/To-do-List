import { useState } from "react";

const toDoList = [
  {
    id: 1,
    placeholder: "HTML",
    marked: false,
  },
  {
    id: 2,
    placeholder: "CSS",
    marked: false,
  },
  {
    id: 3,
    placeholder: "JavaScript",
    marked: false,
  },
  {
    id: 4,
    placeholder: "ReactJs",
    marked: false,
  },
  {
    id: 5,
    placeholder: "Java SE",
    marked: false,
  },
];

export default function App() {
  const [addItems, setAddItems] = useState("");
  const [updatedList, setupdatedList] = useState(toDoList);
  const [sortBy, setSortBy] = useState("Sort Selection");

  let count = updatedList.length + 1;
  let sortedItems = updatedList;
  function handleEvent() {
    if (addItems === "") return;
    const list = {
      placeholder: addItems,
      id: count,
      marked: false,
    };
    sortedItems = [...toDoList, list];
    setupdatedList((curtn) => [...curtn, list]);
  }

  function handleChecked(id) {
    setupdatedList((items) =>
      items.map((item) => (item.id === id ? { ...item, marked: true } : item))
    );
  }

  function handleDeleteItem(item) {
    setupdatedList((itemList) => itemList.filter((currnt) => currnt !== item));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAddItems("");
  }

  function handleSelect(e) {
    setSortBy(e);
    if (e === "all") setupdatedList(sortedItems);

    if (e === "Remaining")
      setupdatedList((currnt) =>
        currnt.slice().sort((a, b) => Number(a.marked) - Number(b.marked))
      );

    if (e === "Completed")
      setupdatedList((currnt) =>
        currnt.slice().sort((a, b) => Number(b.marked) - Number(a.marked))
      );
  }

  return (
    <div className="container">
      <h1>
        What <span>Needs</span> to be Done
      </h1>
      <AddList
        addItems={addItems}
        setAddItems={setAddItems}
        onEvent={handleEvent}
        handleSubmit={handleSubmit}
        sortBy={sortBy}
        handleSelect={handleSelect}
      />
      <List
        item={updatedList}
        handleChecked={handleChecked}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

function AddList({
  addItems,
  setAddItems,
  onEvent,
  handleSubmit,
  sortBy,
  handleSelect,
}) {
  return (
    <form className="input-container " onSubmit={handleSubmit}>
      <div className="inputListItems">
        <input
          type="text"
          placeholder="Enter Work to add "
          value={addItems}
          onChange={(e) => setAddItems(e.target.value)}
        />
        <button onClick={(e) => onEvent()}>➕</button>
      </div>
      <select value={sortBy} onChange={(e) => handleSelect(e.target.value)}>
        <option disabled>Sort Selection</option>
        <option value="Remaining">Remaining</option>
        <option value="Completed">Compeleted</option>
      </select>
    </form>
  );
}
function List({ item, handleChecked, handleDeleteItem }) {
  return (
    <div className="list-items">
      {item.map((item) => (
        <div
          key={item.id}
          className={
            item.marked === true ? "inputTransformed" : "inputListItems-cat"
          }
        >
          <p className={item.marked === true ? "marked" : ""}>
            {item.placeholder}
          </p>
          <div>
            <button type="button" onClick={() => handleChecked(item.id)}>
              ✅
            </button>
            <button type="button" onClick={() => handleDeleteItem(item)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
