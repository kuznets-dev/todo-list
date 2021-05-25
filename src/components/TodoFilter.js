import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

function TodoFilter({ todoStatus, setTodoStatus }) {

    return (
        <ButtonGroup>
            <Button
                onClick={() => setTodoStatus('all')}
                variant={todoStatus === "all" ? "contained" : "outlined"}
                color="default">
                All
            </Button>
            <Button
                onClick={() => setTodoStatus('done')}
                variant={todoStatus === "done" ? "contained" : "outlined"}
                color="primary">
                Done
            </Button>
            <Button
                onClick={() => setTodoStatus('undone')}
                variant={todoStatus === "undone" ? "contained" : "outlined"}
                color="secondary">
                Undone
            </Button>
        </ButtonGroup>
    )
}

export default TodoFilter;