import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React from 'react';

function Pagination({ pageCount, currentPage, setCurrentPage }) {
    
    const pages = new Array(pageCount).fill('').map((_, i) => i + 1)
    return (
        <Grid
            container
            justify='center'>
            <Button
                color='primary'
                onClick={() => setCurrentPage(1)}>
                <ArrowBackIos />
            </Button>
            <Grid>
                <ButtonGroup>
                    {pages.map(item => (
                        <Button
                            key={item}
                            color="primary"
                            variant={item === currentPage ? "contained" : "outlined"}
                            onClick={() => setCurrentPage(item)}>
                            {item}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
            <Button
                color='primary'
                onClick={() => setCurrentPage(pages.length)}>
                <ArrowForwardIos />
            </Button>
        </Grid>
    )
}

export default Pagination;