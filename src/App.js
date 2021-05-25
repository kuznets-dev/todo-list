import React, { useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoSort from './components/TodoSort';
import { Grid } from '@material-ui/core';

function App() {

    // State
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState('all');
    const [todoSort, setTodoSort] = useState(true);

    // Add new todo
    const addTodo = (todoName) => {
        if (todoName) {
            const newItem = {
                id: Math.floor(Math.random() * (1000 - 1 + 1)) +1,
                task: todoName,
                date: new Date().toLocaleDateString(),
                time: new Date().getTime(),
                status: false
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
        newTodos[todoId].status = !newTodos[todoId].status;
        setTodos(newTodos);
    }

    // Filtering and sorting
    const filterTodos = useMemo(() => {
        const newTodos = [...todos];

        const filteredTodos = newTodos.filter(todo => {
            switch (todoStatus) {
                case 'all':
                    return todo;
                case 'done':
                    return todo.status === true;
                default:
                    return todo.status === false;
            }

        })

        const sortBy = filteredTodos.sort((a, b) => {
            if (!todoSort) {
                return b.time - a.time;
            }
            return a.time - b.time;
        })

        return sortBy;

    }, [todos, todoStatus, todoSort]);

    return (
        <div className="wrapper">
            <Typography
                variant="h1"
                component="h2"
                align="center">
                Todo
            </Typography>
            <TodoForm addTodo={addTodo}/>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Grid>
                    <TodoFilter
                        filterTodos={filterTodos}
                        setTodoStatus={setTodoStatus}
                    />
                </Grid>
                <Grid>
                    <TodoSort
                        todoSort={todoSort}
                        setTodoSort={setTodoSort}>
                    </TodoSort>
                </Grid>
            </Grid>
            <TodoList 
                todos={filterTodos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default App;