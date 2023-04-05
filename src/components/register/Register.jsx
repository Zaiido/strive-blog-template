import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        register()
    };


    const register = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/authors/register`,
                {
                    method: "POST",
                    body: JSON.stringify({ name, surname, email, password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                navigate("/")
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </Form.Group>

                <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mt-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>
        </Container>
    )
}

export default Register