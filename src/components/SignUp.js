import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import axios from '../axiosConfig';
import React, { useState } from 'react';

function SignUp() {

    const [user, setUser] = useState({ name: '', password: '' });

    const signUp = async () => {
        try {
            await axios.post('/registration', {
                name: user.name,
                password: user.password
            })
            setUser({ name: '', password: '' });
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <div className="wrapper">
            <form onSubmit={e => e.preventDefault()}>
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
                            type="name"
                            name="name"
                            onChange={e => handleChange(e)}
                            value={user.name}
                            style={{ marginTop: 30 }}
                            label="Username" />
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
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
                            onClick={() => signUp()}
                            type="submit"
                            style={{ marginRight: 30, textTransform: 'none' }}
                            variant="contained"
                            color="primary">
                            SignUp
                        </Button>
                        <Button
                            style={{ textTransform: 'none' }}
                            color="primary">
                            Уже есть аккаунт?
                        </Button>
                    </Grid>
                </Container>
            </form>
        </div>
    )
}

export default SignUp;