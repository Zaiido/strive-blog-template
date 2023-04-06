import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login()
    };

    const login = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/authors/login`,
                {
                    method: "POST",
                    body: JSON.stringify({ email: email, password: password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                let { accessToken } = await response.json()
                localStorage.setItem('token', accessToken);
                navigate("/home")
            } else {
                console.log("Try again")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <Form style={{ marginTop: "150px" }}>
                <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mt-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button className="mt-3 mr-3" variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
                <a href="http://localhost:3001/authors/auth/google">
                    <Button className="mt-3 mx-3" variant="light">
                        <img style={{ width: "30px" }} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Icon" />
                        Login with Google
                    </Button>
                </a>
                <Link style={{ display: "block", textDecoration: "none", fontSize: "14px" }} className="mt-2" to={"/register"}>Click here to register!</Link>
            </Form>
        </Container>
    )
}

export default Login