import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Sends a request to the backend to authenticate the user
      const res = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      // storing the user data
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);

      const role = res.data.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.data);
      alert("Login failed. Please check your credentials!");
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="container">
          <div className="form-box-login">
            <div className="form-box">
              <h1>Login</h1>
              <div className="input-box">
                <input
                  className="input-box-in"
                  type="email"
                  placeholder="Enter Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-box">
                <input
                  className="input-box-in"
                  type="password"
                  placeholder="Password..."
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button className="auth-link" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel">
              <h1>Hello, Welcome!</h1>
              <p>"Continuous Improvement, Endless Possibilities.."</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
