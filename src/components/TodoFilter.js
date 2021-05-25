import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

function TodoFilter({ todoStatus, setTodoStatus }) {

    return (
        <ButtonGroup>
            <Button
                onClick={() => setTodoStatus('all')}
                variant="contained"
                color="default">
                All
            </Button>
            <Button
                onClick={() => setTodoStatus('done')}
                variant="outlined"
                color="primary">
                Done
            </Button>
            <Button
                onClick={() => setTodoStatus('undone')}
                variant="outlined"
                color="secondary">
                Undone
            </Button>
        </ButtonGroup>
    )
}

export default TodoFilter;