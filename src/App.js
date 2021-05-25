import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoSort from './components/TodoSort';
import { Grid } from '@material-ui/core';

function App() {

    // State
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState({status: 'all'});

    // Add new todo
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

    // Remove todo
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    // Change status todo
    const toggleTodo = (id) => {        
        const newTodos = [...todos];        
        const todoId = newTodos.findIndex(el => el.id === id);        
        newTodos[todoId].complete = !newTodos[todoId].complete;
        setTodos(newTodos);
    }

    // Filtering by status
    // const filterBy = (todoStatus) => {
    //     setTodos(todos.filter(todo => todo.complete !== complete))
    // }

    const filterBy = (complete) => {
        const filterTodos = [...todos].filter(item => {
            if (item.complete === false) {
                return item;
            }
        })
    }

    // Sorting by date
    const sortBy = (time) => {
        const sortTodo = [...todos].sort((a, b) => {return b.time - a.time});
        return sortTodo;
    }

    return (
        <div className="wrapper">
            <Typography
                variant="h1"
                component="h2"
                align="center">
                Todo
            </Typography>
            <TodoForm addTodo={addTodo} />
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Grid>
                    <TodoFilter
                        filterBy={filterBy} 
                    />
                </Grid>
                <Grid>
                    <TodoSort sortBy={sortBy}></TodoSort>
                </Grid>
            </Grid>
            <TodoList 
                todos={todos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default App;