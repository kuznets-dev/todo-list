import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoSort from './components/TodoSort';
import { Grid } from '@material-ui/core';
import Pagination from './components/Pagination';
import axios from './axiosConfig';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

function App() {

    // State
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState('');
    const [todoSort, setTodoSort] = useState(true);
    const [currentPage, setCurrentpage] = useState(1);
    const [errorAlert, setErrorAlert] = useState({alert: false, message: 'message', statusCode: 'status'});
    
    // Fetch API
    // GET
    const fetchTodos = useCallback(async () => {
        const response = await axios.get('/tasks', {
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
        try {
            await axios.post('/task', 
            {
                name: todoName,
                done: false,
            });
            await fetchTodos();
        }
        catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;   
            setErrorAlert({alert: true, message: message, statusCode: status});
        }
    }

    // DELETE
    // Remove todo
    const removeTodo = async (id) => {
        try {
            await axios.delete(`task/${id}`);
            await fetchTodos();
        }
        catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;   
            setErrorAlert({alert: true, message: message, statusCode: status});
        }
    }    
    // PATCH
    // Change and rename todo
    const changeTodo = async (todo, name, done) => {
        try {
            await axios.patch(`/task/${todo.uuid}`, {
                name: name,
                done: done
            });
            await fetchTodos();
        }
        catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;   
            setErrorAlert({alert: true, message: message, statusCode: status});
        }
    }

    const handleClose = () => {
        setErrorAlert(prev => ({...prev, alert: false}));
    }

    // Pagination
    const perPage = 5;
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
            <Snackbar open={errorAlert.alert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    <AlertTitle>{`${errorAlert.message}`}</AlertTitle>
                    {`Status code: ${errorAlert.statusCode}`}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default App;