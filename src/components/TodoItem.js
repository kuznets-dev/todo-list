import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Checkbox, FormControlLabel, ListItemText } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function TodoItem({ todo, removeTodo, toggleTodo }) {
    return (
        <ListItem>
            <FormControlLabel
                onClick={() => toggleTodo(todo.id)} 
                control={<Checkbox 
                    icon={<DoneIcon />} 
                    checkedIcon={<DoneAllIcon 
                    color="primary"/>} 
                name="checkedH" />}
            />
            <ListItemText>
                {todo.task}
                {todo.date}
                {todo.time}
            </ListItemText>
            <IconButton 
                aria-label="delete" 
                onClick={() => removeTodo(todo.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
        
    )
}

export default TodoItem;