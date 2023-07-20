import { useState, useEffect } from "react";

const App = () => {
  const [list, setList] = useState(() => {
    const storedList = JSON.parse(localStorage.getItem("todoList") || "[]");
    return storedList;
  });

  const [item, setItem] = useState("");

  useEffect(() => {
    // Save the todo list to local storage whenever it changes
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const AddToList = () => {
    if (item.trim() !== "") {
      setList([...list, item]);
      setItem("");
    }
  };

  const RemoveItem = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  return (
    <div>
      <input
        onChange={(e) => setItem(e.target.value)}
        value={item}
        type="text"
        placeholder="Item Add"
      />
      <br />
      <br />
      <button onClick={AddToList}>Add Todo</button>
      <table>
        <tbody>
          {list.length !== 0 ? (
            list.map((element, index) => {
              return (
                <tr key={index.toString()}>
                  <td>{element}</td>
                  <td>
                    <button
                      onClick={() => {
                        RemoveItem(index);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default App;
