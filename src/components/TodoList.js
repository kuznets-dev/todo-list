import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function TodoList({ todo, toggleTodo, removeTodo }) {
    return (
        <div style={{ margin: 0, padding: 0, display:'flex', justifyContent: 'space-between' }} key={todo.id}>
            <div onClick={() => toggleTodo(todo.id)}>
                {todo.text}
            </div>
            <IconButton aria-label="delete" onClick={() => removeTodo(todo.id)}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default TodoList;