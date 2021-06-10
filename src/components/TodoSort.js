import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function TodoSort({ todoSort, setTodoSort}) {

    const handleSortTask = (sort) => {
        if (sort !== todoSort){
            setTodoSort(sort);
        }
    }

    return (
        <Grid
            container
            direction='row'
            alignItems='center'>
            <Typography
                variant='h6'
                component='h2'>
                Sorted by Date
            </Typography>
            <IconButton
                color={todoSort === 'desc' ? 'primary' : 'default'}
                onClick={() => handleSortTask('desc')}
                aria-label='delete'
                size='medium'>
                <ArrowUpwardIcon fontSize='inherit' />
            </IconButton>
            <IconButton
                color={todoSort === 'asc' ? 'primary' : 'default'}
                onClick={() => handleSortTask('asc')}
                aria-label='delete'
                size='medium'>
                <ArrowDownwardIcon fontSize='inherit' />
            </IconButton>
        </Grid>
    )
}

export default TodoSort;