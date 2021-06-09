import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Grid } from '@material-ui/core';
import Pagination from './Pagination';
import axios from '../axiosConfig';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

function Todo() {

    // State
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState('');
    const [todoSort, setTodoSort] = useState(true);
    const [pageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [errorAlert, setErrorAlert] = useState({ alert: false, message: 'message', statusCode: 'status' });

    // Fetch API
    // GET
    const fetchTodos = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('/tasks', {
                params: {
                    filterBy: todoStatus,
                    orderBy: todoSort ? "asc" : 'desc',
                    page: currentPage,
                    limit: 5
                }
            });
            setPageCount(response.data.pageCount)
            setTodos(response.data.rows)
        } catch (err) {
            console.log(err.response);
        }
    }, [todoStatus, todoSort, currentPage]);

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
            setErrorAlert({ alert: true, message: message, statusCode: status });
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
            setErrorAlert({ alert: true, message: message, statusCode: status });
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
            setErrorAlert({ alert: true, message: message, statusCode: status });
        }
    }

    const handleClose = () => {
        setErrorAlert(prev => ({ ...prev, alert: false }));
    }

    return (
        <div className="wrapper">
            <Typography
                style={{ marginTop: 50 }}
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
                todos={todos}
                removeTodo={removeTodo}
                changeTodo={changeTodo}
            />
            {(pageCount > 1) &&
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}>
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

export default Todo;