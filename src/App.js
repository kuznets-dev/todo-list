import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todoName) => {
        if (todoName) {
            const newItem = {
                id: Math.floor(Math.random() * (1000 - + 1)) +1,
                task: todoName,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                complete: false
            }
            setTodos([...todos, newItem])
        }
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id) => {        
        const newTodos = [...todos];        
        const todoId = newTodos.findIndex(el => el.id === id);        
        newTodos[todoId].complete = !newTodos[todoId].complete;
        setTodos(newTodos);
    }

    return (
        <div className="wrapper">
            <Typography variant="h1" component="h2" align="center">
                Todo
            </Typography>
            <TodoForm addTodo={addTodo} />            
            <TodoList 
                todos={todos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default App;