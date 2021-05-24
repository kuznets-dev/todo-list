import { Button, ButtonGroup, Grid } from '@material-ui/core';
import React, { useState } from 'react';

function TodoFilter() {

    return (
        <ButtonGroup>
            <Button
                value="all"
                variant="outlined"
                color="default" >
                All
            </Button>
            <Button
                // onClick={() => filterBy(todos.complete)}
                value="done"
                variant="outlined"
                color="primary">
                Done
            </Button>
            <Button
                value="undone"
                variant="outlined"
                color="secondary">
                Undone
            </Button>
        </ButtonGroup>
    )
}

export default TodoFilter;