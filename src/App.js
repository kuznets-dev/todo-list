import { useCallback, useEffect, useState } from 'react';
import { Container, Snackbar } from '@material-ui/core';
import { Header } from './components/Header';
import Todo from './components/Todo';
import Auth from './components/Auth';
import axios from './axiosConfig';
import { Alert, AlertTitle } from '@material-ui/lab';

function App() {

    const [user, setUser] = useState({ name: '', password: '' });
    const [userName, setUserName] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [errorAlert, setErrorAlert] = useState({alert: false, message: 'message', statusCode: 'status'});

    const isToken = useCallback(() => {
        if (localStorage.token) setIsLogin(true);
    }, []);

    useEffect(() => {
        isToken();
    }, [isToken]);

    const signUp = async () => {
        try {
            await axios.post('/registration', {
                name: user.name,
                password: user.password
            })
            setUser({ name: '', password: '' });
        } catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;   
            setErrorAlert({alert: true, message: message, statusCode: status});
        }
    }

    const login = async () => {
        try {
            const res = await axios.post('/login', {
                name: user.name,
                password: user.password
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            setUser({ name: '', password: '' });
            setIsLogin(true);            
        } catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;   
            setErrorAlert({alert: true, message: message, statusCode: status});
        }
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleClose = () => {
        setErrorAlert(prev => ({...prev, alert: false}));
    }

    return(
        <Container
            style={{ padding: 0 }}
            maxWidth='xl'>
            <Header
                userName={userName}
                isLogin={isLogin}
                setIsLogin={setIsLogin}/>
            {isLogin
            ? <Todo
                setUserName={setUserName}/>
            :<Auth
                user={user}
                isSignup={isSignup}
                setIsSignup={setIsSignup}
                signUp={signUp}
                login={login}
                handleChange={handleChange}/>}
            <Snackbar open={errorAlert.alert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='error'>
                    <AlertTitle>{`${errorAlert.message}`}</AlertTitle>
                    {`Status code: ${errorAlert.statusCode}`}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default App;