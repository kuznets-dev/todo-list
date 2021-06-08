import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

function Auth() {
    return (
        <div className="wrapper">
            <form>
                <Container>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        align="center">
                        <Typography
                            style={{ marginTop: 100 }}
                            variant="h3"
                            align="center">
                            Регистрация
                    </Typography>
                        <TextField
                            style={{ marginTop: 30 }}
                            label="E-mail" />
                        <TextField
                            style={{ marginTop: 30 }}
                            label="Password" />
                    </Grid>
                    <Grid
                    style={{ marginTop: 30 }}
                    container
                    direction="row"
                    justify="center"
                    align="center">
                        <Button
                            style={{ marginRight: 30 }}
                            variant="contained"
                            color="primary">
                            Войти
                        </Button>
                        <Button color="primary">Уже есть аккаунт?</Button>
                    </Grid>
                </Container>
            </form>
        </div>
    )
}

export default Auth;