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
        <>
       <h1
      style={{
        color:"purple",
        textShadow: "2px 2px 8px #fff, 0 2px 4px #0002",
        position: "absolute",
        top: -10,
        left: 10,
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: "3.7rem",
        zIndex: 10,
        margin: 0,
      }}
    >
      <img
      src="/Icon.png"style={{ width: 150, height: 150, marginRight: 5, }}/>
      MindBloom
    </h1>
        <div
            className="min-h-screen w-full d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "rgb(168, 112, 167)" }}
        >
        <div
        className="d-flex flex-row justify-content-center align-items-center w-100"
        style={{ minHeight: "100vh", marginTop:35 }}
        >
      {/* Left: Form Box */}
        <div
            className="p-4 rounded"
            style={{
            backgroundColor: "rgb(144, 86, 143)",
            minWidth: 400,
            maxWidth: 500,
            marginRight: 30,
            }}
        >
        <h2
          className="text-center"
          style={{
            color: "white",
            fontFamily: "monospace",
            fontWeight: "bold",
            marginTop:-10,
            marginBottom: 20,
          }}
        >
          Login
        </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"></label>
                        <input
                        type="email"
                        placeholder="Enter Your Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-10"
                        style={{ color: "purple", marginTop: -20 }}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"></label>
                        <input
                        type="password"
                        placeholder="Enter Your Password"
                        autoComplete="off"
                        name="password"
                        className="form-control rounded-10"
                        style={{ color: "purple", marginTop: -20 }}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success w-100 rounded-10"
                        style={{
                        backgroundColor: "purple",
                        borderColor: "purple",
                        fontWeight: "bold",
                        }}
                    >
                        Login
                    </button>
                    <p  style={{ color: "white" }}>Do Not Have an Account ?</p>
                    <Link to="/register" className="btn btn-default w-100 rounded-10 text-decoration-none"
                        style={{
                        backgroundColor: "purple",
                        borderColor: "purple",
                        fontWeight: "bold",
                        color: "white",
                        marginTop: -10,
                        }}
                    >
                        Sign Up
                    </Link>
                </form>
        </div>
      {/* Right: Girl Image */}
      <div className="d-flex align-items-center justify-content-center">
        <img
          src="/images/2-removebg-preview.png"
          alt="Girl"
          style={{ maxWidth: 350, width: "100%" }}
        />
      </div>
    </div>
  </div>
  {/* Footer */}
    <div
      className="w-100"
      style={{
        background: "rgba(168, 112, 167, 0.4)",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      <div style={{ display: "flex", gap: "24px", color: "#6d28d9", fontSize: "15px" }}>
        <a href="https://www.themindfulnessapp.com/help-center" style={{ color: "#6d28d9" }}>FAQ</a>
        <a href="/about-us.html" style={{ color: "#6d28d9" }}>Contact</a>
        <a href="https://policies.google.com/privacy?hl=en-US" style={{ color: "#6d28d9" }}>Privacy &amp; Terms</a>
      </div>
      <div style={{ color: "#6d28d9", fontSize: "15px" }}>
        &copy; Copyright MindWealth 2025
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ color: "#6d28d9", fontSize: "15px" }}>Follow us on</span>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/instagram.png" alt="Instagram" style={{ width: 24, height: 24 }} />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/Facebook.png" alt="Facebook" style={{ width: 24, height: 24 }} />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/Twitter.png" alt="Twitter" style={{ width: 24, height: 24 }} />
        </a>
      </div>
    </div>
    </>
    )
}

export default SignUp;