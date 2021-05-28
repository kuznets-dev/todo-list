import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Checkbox, Grid, ListItemText, TextField } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function TodoItem({ todo, removeTodo, toggleTodo, changeNameTodo }) {

    const [toggleNameTodo, setToggleNameTodo] = useState(false);
    const [todoName, setTodoName] = useState(todo.name);

    const handleKeyDown = (todo, e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            setToggleNameTodo(false);
            changeNameTodo(todo, todoName);
        };
        if (e.key === "Escape") {
            setToggleNameTodo(false);
            setTodoName(todo.name);
        };
    }

    return (
        <ListItem>
            <Grid
                container
                direction="row"
                alignItems="center">
                <Grid item xs={1}>
                    <Checkbox
                    onClick={() => toggleTodo(todo)}
                    icon={<DoneIcon />}
                    checkedIcon={<DoneAllIcon
                    color="primary" />}
                    checked={todo.done} />
                </Grid>
                <Grid item xs={8}>
                    {toggleNameTodo 
                        ? <TextField 
                            multiline={true}
                            value={todoName}
                            autoFocus={true}
                            variant='outlined'
                            onChange={(e) => setTodoName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(todo, e)} />
                        :   <ListItemText 
                            primary={todo.name}
                            style={{overflowWrap: 'break-word'}}
                            multiline='true'
                            onClick={() => setToggleNameTodo(true)} />
                    }
                </Grid>
                <Grid item xs={2}>
                    <ListItemText>
                        {todo.updatedAt}
                    </ListItemText>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        aria-label="delete"
                        onClick={() => removeTodo(todo.uuid)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default TodoItem;