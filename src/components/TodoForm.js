import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

function TodoForm({ addTodo }) {
    const [input, setInput] = useState('');

    const handleChange = ((event) => {
        setInput(event.target.value)
    })

    const handleSumbit = ((event) => {
        event.preventDefault();
        addTodo(input);
        setInput("");
    })

    const handleKeyDown = ((event) => {
        if (event.key === "Enter") {
            handleSumbit(event);
        }
    })

    return (
        <form onSubmit={handleSumbit}>
            <TextField
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="I want to..."
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
        </form>
    );
}

export default TodoForm;