import React from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp(){

    const[password, setPassword] = React.useState("");
    const[email, setEmail] = React.useState ("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/login" , {email, password})
        .then(result => {console.log(result)
            if (result.data === "Successful Login") {
                navigate("/home")
            } 
        })
        .catch(err => {console.log(err)})
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-250">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" 
                               placeholder="Enter Email"
                               autoComplete="off"
                               name="email"
                               className="form-control rounded-0"
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" 
                               placeholder="Enter Password"
                               autoComplete="off"
                               name="password"
                               className="form-control rounded-0"
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                    <p>Do not Have an Account</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Register
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;