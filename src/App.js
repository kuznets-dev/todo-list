import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (input) => {
    if (input && input.length < 30) {
      const newItem = {
        id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
        text: input,
        complete: false
      }
      setTodos([...todos, newItem])
    } else {
      alert('Your Todo is big')
    }
  }

  const removeTodo = (id) => {
    console.log(id);
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const toggleTodo = () => {

  }

  return (
    <div className="wrapper">
      <h1 className="title">Todo</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => {
        return (
          <TodoList
          todo={todo} 
          key={todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          />
        )
      })
      }
    </div>
  );
}

export default App;
