import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function TodoSort({ sortBy, todoDate, setTodoDate}) {

    const handleSort = (date) => {
        if (date !== todoDate.sortDate){
            setTodoDate(prev => ({...prev, sortDate: date}));
            sortBy(date)
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
                color={todoDate.sortDate ? 'primary' : 'default'}
                onClick={() => handleSort(true)}
                aria-label="delete"
                size="small">
                <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
            <IconButton
                color={!todoDate.sortDate ? 'primary' : 'default'}
                onClick={() => handleSort(false)}
                aria-label="delete"
                size="small">
                <ArrowDownwardIcon fontSize="inherit" />
            </IconButton>
        </Grid>
    )
}

export default TodoSort;