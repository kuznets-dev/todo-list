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
    const [todoStatus, setTodoStatus] = useState('all');
    const [todoSort, setTodoSort] = useState(true);
    const [currentPage, setCurrentpage] = useState(1);
    const [perPage] = useState(5);
    
    // Fetch API
    // GET
    const fetchTodos = useCallback(async () => {
        const response = await axios.get(GETurl);
        console.log(response.data);
        setTodos(response.data)
    }, [setTodos]);

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

    // Rename todo
    const changeNameTodo = (id, todoName) => {
        const newTodos = [...todos];
        const todoId = newTodos.findIndex(todo => todo.id === id);
        newTodos[todoId].task = todoName;
    }

    // Filtering and sorting
    // const filterTodos = useMemo(() => {
    //     const newTodos = [...todos];

    //     const filteredTodos = newTodos.filter(todo => {
    //         switch (todoStatus) {
    //             case 'all':
    //                 return todo;
    //             case 'done':
    //                 return todo.status === true;
    //             default:
    //                 return todo.status === false;
    //         }
    //     })

    //     const sortBy = filteredTodos.sort((a, b) => {
    //         if (!todoSort) {
    //             return b.time - a.time;
    //         }
    //         return a.time - b.time;
    //     })

    //     return sortBy;

    // }, [todos, todoStatus, todoSort]);

    // Pagination
    const paginationTodo = useMemo(() => {
        const filterTodos = [...todos];
        const indexOfLastPost = currentPage * perPage;
        const indexOfFirstPost = indexOfLastPost - perPage;
        const currentTodos = filterTodos.slice(indexOfFirstPost, indexOfLastPost);
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
                        filterTodos={paginationTodo}
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
            {(paginationTodo.length > 0) && 
                <Pagination
                    totalTodos={paginationTodo.length}
                    perPage={perPage}
                    currentPage={currentPage}
                    setCurrentpage={setCurrentpage}>
                </Pagination>
            }
        </div>
    )
}

export default App;