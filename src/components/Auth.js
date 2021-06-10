import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';

function Auth({ user, isSignup, setIsSignup, signUp, login, handleChange }) {
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
                            {isSignup ? 'SignUp': 'Login'}
                    </Typography>
                        <TextField
                            type='name'
                            name='name'
                            onChange={handleChange}
                            value={user.name}
                            style={{ marginTop: 30 }}
                            label='Username' />
                        <TextField
                            type='password'
                            name='password'
                            onChange={handleChange}
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
                        ?<Button
                            onClick={signUp}
                            type='submit'
                            style={{ marginRight: 30, textTransform: 'none' }}
                            variant='contained'
                            color='primary'>
                            SignUp
                        </Button>
                        :<Button
                            onClick={login}
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
                            {isSignup ? 'Do you have account?': 'No accaunt?'}
                        </Button>
                    </Grid>
                </Container>
            </form>
        </div>
    )    
}

export default Auth;