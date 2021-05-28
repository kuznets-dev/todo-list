import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoSort from './components/TodoSort';
import { Grid } from '@material-ui/core';
import Pagination from './components/Pagination';
import axios from './axiosConfig';

function App() {

    // State
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState('');
    const [todoSort, setTodoSort] = useState(true);
    const [currentPage, setCurrentpage] = useState(1);
    const [perPage] = useState(5);
    
    // Fetch API
    // GET
    const fetchTodos = useCallback(async () => {
        const response = await axios.get('/v1/tasks/1', {
        params: {
            filterBy: todoStatus,
            order: todoSort ? "asc" : 'desc'
        }});
        setTodos(response.data)
    }, [todoStatus, todoSort]);

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    // POST
    // Add new todo
    const addTodo = async (todoName) => {
        await axios.post('/v1/task/1', 
        {
            name: todoName,
            done: false,
        });
        await fetchTodos();
    }

    // DELETE
    // Remove todo
    const removeTodo = async (id) => {
        await axios.delete(`/v1/task/1/${id}`);
        await fetchTodos();
    }

    // PATCH
    // Change status todo
    const checkTodo = async (todo) => {
        await axios.patch(`/v1/task/1/${todo.uuid}`,
        {
            name: todo.name,
            done: !todo.done
        });
        await fetchTodos();
    }

    // PATCH
    // Rename todo
    const changeTodo = async (todo, todoName) => {
        await axios.patch(`/v1/task/1/${todo.uuid}`, {
            name: todoName,
            done: todo.done
        });
        await fetchTodos();
    }

    // Pagination
    const paginationTodo = useMemo(() => {
        const indexOfLastPost = currentPage * perPage;
        const indexOfFirstPost = indexOfLastPost - perPage;
        const currentTodos = todos.slice(indexOfFirstPost, indexOfLastPost);
        return currentTodos;
    }, [currentPage, perPage, todos]);

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
                        todoStatus={todoStatus}
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
                todos={paginationTodo}
                removeTodo={removeTodo}
                checkTodo={checkTodo}
                changeTodo={changeTodo}
            />
            {(todos.length >= 5) && 
                <Pagination
                    totalTodos={todos.length}
                    perPage={perPage}
                    currentPage={currentPage}
                    setCurrentpage={setCurrentpage}>
                </Pagination>
            }
        </div>
    )
}

export default App;