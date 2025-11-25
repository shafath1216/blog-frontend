import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { addItemToServer,getItemFromServer,markItemAsCompletedOnServer,deleteItemFromServer } from "./services/itemsService";
import { useState,useEffect } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  useEffect( () => {
      getItemFromServer().then( (loadInitialItems)=>{
        setTodoItems(loadInitialItems);
      });
    
  },[]);
    
  
  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const serverItem = await addItemToServer(itemName,itemDueDate);
    const newTodoItems = [
      ...todoItems,
      serverItem,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const itemId = await deleteItemFromServer(id);
    console.log("Item deleted with id:", itemId);
    const newTodoItems = todoItems.filter((item) => item.id !== itemId);
    setTodoItems(newTodoItems);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
      ></TodoItems>
    </center>
  );
}

export default App;
