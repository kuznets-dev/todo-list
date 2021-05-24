import React from 'react';
import { Button, ButtonGroup, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function TodoSort({ sortBy }) {

    const handleSort = (event) => {
        console.log(event.target.value);
    }

    return (
        <Grid
            container
            direction="row"
            alignItems="center">
            <Grid item xs={5}>
                <Typography
                    variant="h6"
                    component="h2">
                    Sorted by Date
                </Typography>
            </Grid>
            <Grid>
                <IconButton
                    onClick={handleSort}
                    aria-label="delete"
                    size="small">
                    <ArrowUpwardIcon fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid>
                <IconButton
                    onClick={handleSort}
                    aria-label="delete"
                    size="small">
                    <ArrowDownwardIcon fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default TodoSort;