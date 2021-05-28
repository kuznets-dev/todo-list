import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Checkbox, Grid, ListItemText, TextField } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function TodoItem({ todo, removeTodo, checkTodo, changeTodo }) {

    const [changeNameTodo, setChangeNameTodo] = useState(false);
    const [todoName, setTodoName] = useState(todo.name);

    const handleKeyDown = (todo, e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            setChangeNameTodo(false);
            changeTodo(todo, todoName);
        };
        if (e.key === "Escape") {
            setChangeNameTodo(false);
            setTodoName(todo.name);
        };
    }

    const onBlur = () => {
        setChangeNameTodo(false);
        setTodoName(todo.name);
    }

    return (
        <ListItem>
            <Grid
                container
                direction="row"
                alignItems="center">
                <Grid item xs={1}>
                    <Checkbox
                    onClick={() => checkTodo(todo)}
                    icon={<DoneIcon />}
                    checkedIcon={<DoneAllIcon
                    color="primary" />}
                    checked={todo.done} />
                </Grid>
                <Grid item xs={8}>
                    {changeNameTodo 
                        ? <TextField 
                            multiline={true}
                            value={todoName}
                            autoFocus={true}
                            variant='outlined'
                            onChange={(e) => setTodoName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(todo, e)} 
                            onBlur={onBlur} />
                        :   <ListItemText
                            primary={todo.name}
                            style={{overflowWrap: 'break-word'}}
                            multiline='true'
                            onClick={() => setChangeNameTodo(true)} />
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