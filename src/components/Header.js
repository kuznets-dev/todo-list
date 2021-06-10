import { Button, Grid, Typography } from '@material-ui/core';

export const Header = ({ userName, isLogin, setIsLogin }) => {

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    }

    return(
            <Grid
                style={{ background: '#3f51b5' }}
                container
                direction='row'
                justify='space-between'
                alignItems='center'>
            <Typography
                style={{ padding: 20, color:'white' }}
                variant='h3'
                align='left'>
                {isLogin ? userName : 'Todo App'}
            </Typography>
            {isLogin && <Button
                onClick={() => logout()}
                style={{ marginRight: 30, textTransform: 'none', fontSize: 18 }}
                variant='contained'
                color='secondary'>
                Logout
            </Button>}
        </Grid>
    )
}