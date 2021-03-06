import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function TodoSort({ todoSort, setTodoSort}) {

    const handleSort = (date) => {
        if (date !== todoSort){
            setTodoSort(date);
        }
    }

    return (
        <Grid
            container
            direction="row"
            alignItems="center">
            <Typography
                variant="h6"
                component="h2">
                Sorted by Date
            </Typography>
            <IconButton
                color={todoSort ? 'primary' : 'default'}
                onClick={() => handleSort(true)}
                aria-label="delete"
                size="small">
                <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
            <IconButton
                color={!todoSort ? 'primary' : 'default'}
                onClick={() => handleSort(false)}
                aria-label="delete"
                size="small">
                <ArrowDownwardIcon fontSize="inherit" />
            </IconButton>
        </Grid>
    )
}

export default TodoSort;