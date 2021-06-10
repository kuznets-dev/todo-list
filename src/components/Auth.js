import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';

function Auth({ isSignup, setIsSignup, signUp, login }) {
    
    const [user, setUser] = useState({ name: '', password: '' });
    
    const handleChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div className='wrapper'>
            <form onSubmit={e => e.preventDefault()}>
                <Container>
                    <Grid
                        container
                        direction='column'
                        justify='center'
                        align='center'>
                        <Typography
                            style={{ marginTop: 100 }}
                            variant='h3'
                            align='center'>
                            {isSignup ? 'SignUp' : 'Login'}
                        </Typography>
                        <TextField
                            type='name'
                            name='name'
                            onChange={handleChangeUser}
                            value={user.name}
                            style={{ marginTop: 30 }}
                            label='Username' />
                        <TextField
                            type='password'
                            name='password'
                            onChange={handleChangeUser}
                            value={user.password}
                            style={{ marginTop: 30 }}
                            label='Password' />
                    </Grid>
                    <Grid
                        style={{ marginTop: 30 }}
                        container
                        direction='row'
                        justify='center'
                        align='center'>
                        {isSignup
                            ? <Button
                                onClick={() => signUp(user)}
                                type='submit'
                                style={{ marginRight: 30, textTransform: 'none' }}
                                variant='contained'
                                color='primary'>
                                SignUp
                            </Button>
                            : <Button
                                onClick={() => login(user)}
                                type='submit'
                                style={{ marginRight: 30, textTransform: 'none' }}
                                variant='contained'
                                color='primary'>
                                Login
                            </Button>}
                        <Button
                            onClick={() => setIsSignup(!isSignup)}
                            style={{ textTransform: 'none' }}
                            color='primary'>
                            {isSignup ? 'Do you have account?' : 'No accaunt?'}
                        </Button>
                    </Grid>
                </Container>
            </form>
        </div>
    )
}

export default Auth;