import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TodoForm from './TodoForm';
import List from '@material-ui/core/List';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Grid } from '@material-ui/core';
import Pagination from './Pagination';
import axios from '../axiosConfig';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import * as jwt from 'jsonwebtoken';

function Todo({ setIsLogin }) {

    // State
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState('');
    const [todoSort, setTodoSort] = useState('desc');
    const [pageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [errorAlert, setErrorAlert] = useState({ alert: false, message: 'message', statusCode: 'status' });
    const [currentTodo, setCurrentTodo] = useState(null);

    // Fetch API
    // GET
    const fetchTodos = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('/tasks', {
                params: {
                    filterBy: todoStatus,
                    orderBy: todoSort,
                    page: currentPage,
                    limit: 5
                }
            });
            setPageCount(response.data.pageCount);
            setTodos(response.data.rows);
        } catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;
            setErrorAlert({ alert: true, message: message, statusCode: status });

            const validToken = jwt.decode(localStorage.token);
            if (validToken) {
                setIsLogin(true);
                return;
            }
            localStorage.removeItem('token');
            setIsLogin(false);
        }
    }, [setIsLogin, todoStatus, todoSort, currentPage]);

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

    const closeAlert = () => {
        setErrorAlert(prev => ({ ...prev, alert: false }));
    }

    const dragStartHandler = (e, todo) => {
        setCurrentTodo(todo);
    }

    const dragEndHandler = (e) => {
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    const dragDropHandler = (e, todo) => {
        e.preventDefault()
        setTodos(todos.map((item) => {
            if (item.uuid === todo.uuid) {
                return {...item, uuid: currentTodo.uuid}
            }
            if (item.uuid === currentTodo.uuid) {
                return {...item, uuid: todo.uuid}
            }
            return item;
        }))
    }

    const dragSort = (a, b) => {
        if (a.uuid > b.uuid) {
            return 1;
        }
        return -1;
    }

    return (
        <div className='wrapper'>
            <Typography
                style={{ marginTop: 100 }}
                variant='h2'
                align='center'>
                Todo
            </Typography>
            <TodoForm addTodo={addTodo} />
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'>
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
            <List>
                {todos.sort(dragSort).map(todo =>
                        <div
                            onDragStart={(e) => dragStartHandler(e, todo)}
                            onDragLeave={(e) => dragEndHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dragDropHandler(e, todo)}
                            key={todo.uuid} 
                            draggable={true}>
                                <TodoItem
                                    key={todo.uuid}
                                    todo={todo}
                                    removeTodo={removeTodo}
                                    changeTodo={changeTodo}
                                />
                        </div> 
                    )
                }
            </List>
            {(pageCount > 1) &&
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}>
                </Pagination>
            }
            <Snackbar open={errorAlert.alert} autoHideDuration={3000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity='error'>
                    <AlertTitle>{`${errorAlert.message}`}</AlertTitle>
                    {`Status code: ${errorAlert.statusCode}`}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Todo;