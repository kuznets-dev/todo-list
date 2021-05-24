import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Checkbox, FormControlLabel, Grid, ListItemText } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function TodoItem({ todo, removeTodo, toggleTodo }) {
    return (
        <ListItem>
            <Grid
                container
                direction="row"
                alignItems="center">
                <Grid item xs={1}>
                    <FormControlLabel
                        onClick={() => toggleTodo(todo.id)} 
                        control={<Checkbox 
                        icon={<DoneIcon />} 
                        checkedIcon={<DoneAllIcon 
                        color="primary"/>} 
                        name="checkedH" />}
                    />
                </Grid>
                <Grid item xs={8}>
                    <ListItemText>
                        {todo.task}
                    </ListItemText>
                </Grid>
                <Grid item xs={2}>
                    <ListItemText>
                        {todo.date}
                    </ListItemText>
                </Grid>
                <Grid item xs={1}>
                    <IconButton 
                        aria-label="delete" 
                        onClick={() => removeTodo(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default TodoItem;