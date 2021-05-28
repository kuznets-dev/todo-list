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
    const GETurl = '/v1/tasks/1';
    const POSTurl = '/v1/task/1';
    const [todos, setTodos] = useState([]);
    const [todoStatus, setTodoStatus] = useState('');
    const [todoSort, setTodoSort] = useState(true);
    const [currentPage, setCurrentpage] = useState(1);
    const [perPage] = useState(5);
    
    // Fetch API
    // GET
    const fetchTodos = useCallback(async () => {
        const response = await axios.get(GETurl, {
        params: {
            filterBy: todoStatus,
            order: todoSort ? "asc" : 'desc'
        }});
        console.log(JSON.stringify(response.data, null, 2));
        setTodos(response.data)
    }, [todoStatus, todoSort]);

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    // POST
    // Add new todo
    const addTodo = async (todoName) => {
        await axios.post(POSTurl, 
        {
            name: todoName,
            done: false,
        });
        await fetchTodos();
    }

    // DELETE
    // Remove todo
    const removeTodo = async (id) => {
        await axios.delete(`${POSTurl}/${id}`);
        await fetchTodos();
    }

    // PATCH
    // Change status todo
    const toggleTodo = async (todo) => {
        await axios.patch(`${POSTurl}/${todo.uuid}`,
        {
            name: todo.name,
            done: !todo.done
        });
        await fetchTodos();
    }

    // PATCH
    // Rename todo
    const changeNameTodo = async (todo, todoName) => {
        await axios.patch(`${POSTurl}/${todo.uuid}`, {
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
                toggleTodo={toggleTodo}
                changeNameTodo={changeNameTodo}
            />
            {(todos.length > 0) && 
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