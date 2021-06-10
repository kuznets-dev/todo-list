import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

function TodoForm({ addTodo }) {
    const [todoName, setTodoName] = useState('');

    const handleChangeTask = (event => {
        setTodoName(event.target.value)
    })

    const handleSumbit = (event => {
        event.preventDefault();
        addTodo(todoName);
        setTodoName('');
    })

    const handleKeyDown = (event => {
        if (event.key === 'Enter') {
            handleSumbit(event);
        }
    })

    return (
        <form onSubmit={handleSumbit}>
            <TextField
                value={todoName}
                onChange={handleChangeTask}
                onKeyDown={handleKeyDown} 
                placeholder='I want to...'
                margin='normal'
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant='outlined'
            />
        </form>
    )
}

export default TodoForm;