import { useState } from "react";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
import axios from './axiosConfig';

function App() {

    const [user, setUser] = useState({ name: '', password: '' });
    const [isSignup, setIsSignup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

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

    const login = async () => {
        try {
            const res = await axios.post('/login', {
                name: user.name,
                password: user.password
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            setIsLogin(true);            
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return(
        <Container
            style={{ padding: 0 }}
            maxWidth="xl">
            <Header
                isLogin={isLogin}
                setIsLogin={setIsLogin}/>
            {isLogin
            ? <Todo/>
            :<Auth
                user={user}
                isSignup={isSignup}
                setIsSignup={setIsSignup}
                signUp={signUp}
                login={login}
                handleChange={handleChange}/>}
        </Container>
    )
}

export default App;