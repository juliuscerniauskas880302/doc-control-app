import React from "react";
import "./Login.css";

const Login = ({
  username,
  password,
  onUsernameChange,
  onPassChange,
  onSubmit
}) => {
  return (
    <div className="container">
      <section id="content">
        <form onSubmit={e => onSubmit(e)}>
          <h1>Login Form</h1>
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onUsernameChange}
              placeholder="Username"
              required="required"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onPassChange}
              placeholder="Password"
              required="required"
            />
          </div>
          <div>
            <input type="submit" value="Log in" />
          </div>
        </form>
      </section>
    </div>
  );
};
export default Login;
