import { Button, ButtonGroup, Grid } from '@material-ui/core';
import React, { useState } from 'react';

function TodoFilter({ filterBy }) {
    const [todoTask, setTodoTask] = useState([]);

    const handleChange = (event => {
        event.preventDefault();
        filterBy(todoTask);
    })

    return (
        <ButtonGroup>
            <Button
                variant="outlined"
                color="default" >
                All
            </Button>
            <Button
                onClick={handleChange}
                variant="outlined"
                color="primary">
                Done
            </Button>
            <Button variant="outlined" color="secondary">
                Undone
            </Button>
        </ButtonGroup>
    )
}

export default TodoFilter;