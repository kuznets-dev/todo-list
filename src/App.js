import { useCallback, useEffect, useState } from 'react';
import { Container, Snackbar } from '@material-ui/core';
import { Header } from './components/Header';
import Todo from './components/Todo';
import Auth from './components/Auth';
import axios from './axiosConfig';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as jwt from 'jsonwebtoken';

function App() {

    const [userName, setUserName] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [errorAlert, setErrorAlert] = useState({ alert: false, message: 'message', statusCode: 'status' });

    const checkToken = useCallback(() => {
        if (localStorage.token) {
            const validToken = jwt.decode(localStorage.token);
            if (validToken) {
                setIsLogin(true);
                return;
            }
            localStorage.removeItem('token');
            setIsLogin(false);
        };
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    const login = async ({ name, password }) => {
        try {
            const res = await axios.post('/login', {
                name,
                password
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            setIsLogin(true);
        } catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;
            setErrorAlert({ alert: true, message: message, statusCode: status });
        }
    }

    const signUp = async ({ name, password }) => {
        try {
            await axios.post('/registration', {
                name,
                password
            })
            login({ name, password })
        } catch (err) {
            const message = err.response.data.message;
            const status = err.response.status;
            setErrorAlert({ alert: true, message: message, statusCode: status });
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    }

    const closeAlert = () => {
        setErrorAlert(prev => ({ ...prev, alert: false }));
    }

    return (
        <Container
            style={{ padding: 0 }}
            maxWidth='xl'>
            <Header
                userName={userName}
                isLogin={isLogin}
                logout={logout} />
            {isLogin
                ? <Todo
                    setUserName={setUserName} />
                : <Auth
                    isSignup={isSignup}
                    setIsSignup={setIsSignup}
                    signUp={signUp}
                    login={login}
                    />}
            <Snackbar open={errorAlert.alert} autoHideDuration={3000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity='error'>
                    <AlertTitle>{`${errorAlert.message}`}</AlertTitle>
                    {`Status code: ${errorAlert.statusCode}`}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default App;