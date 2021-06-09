import { useState } from "react";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import Todo from "./components/Todo";
import Auth from "./components/Auth";

function App() {

    const [isLogin, setIsLogin] = useState(false);

    return(
        <Container
            style={{ padding: 0 }}
            maxWidth="xl">
            <Header isLogin={isLogin}/>
            {isLogin
            ? <Todo/>
            :<Auth setIsLogin={setIsLogin}/>}
        </Container>
    )
}

export default App;