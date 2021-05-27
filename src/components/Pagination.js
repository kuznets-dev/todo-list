import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React from 'react';

function Pagination({ totalTodos, perPage, currentPage, setCurrentpage }) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalTodos / perPage); i++) {
        pageNumber.push(i);
    }

    return (
        <Grid
            container
            justify='center'>
            <Button
                color='primary'
                onClick={() => setCurrentpage(1)}>
                <ArrowBackIos />
            </Button>
            <Grid>
                <ButtonGroup>
                    {pageNumber.map(item => (
                        <Button
                            key={item}
                            color='default'
                            variant='outlined'
                            onClick={() => setCurrentpage(item)}>
                            {item}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
            <Button
                color='primary'
                onClick={() => setCurrentpage(pageNumber.length)}>
                <ArrowForwardIos />
            </Button>
        </Grid>
    )
}

export default Pagination;