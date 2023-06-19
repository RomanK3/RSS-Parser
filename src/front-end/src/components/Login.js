import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "./useAuth";
import { API_URL } from "../const";

const Login = () => {
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      auth.signIn(response.data.token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An Error occurred during login");
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      auth.signIn(token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
  };

  return (
    <div className="login">
      <div className="login-block">
        <div className="login-wrapper">
          <h2>{isLoginMode ? "Login" : "Registration"}</h2>
          {error && <p>{error}</p>}
          {isLoginMode ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="submit-block">
                <button className="submit" onClick={handleLogin} type="submit">
                  Login
                </button>
              </div>
              <p className="register">
                Don't have an account?{" "}
                <button onClick={switchMode}>Register</button>
              </p>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="submit-block">
                <button
                  className="submit"
                  onClick={handleRegistration}
                  type="submit">
                  Register
                </button>
              </div>
              <p className="register">
                Already have an account?{" "}
                <button onClick={switchMode}>Login</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
