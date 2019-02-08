import React from "react";
import "./Login.css";

const Login = ({
  username,
  password,
  onUsernameChange,
  onPassChange,
  onSubmit,
  wrongUsernameOrPassword
}) => {
  let wrongData = () => {
    if (wrongUsernameOrPassword)
      return <div className="wrong-pass-or-username">Blogi duomenys</div>;
    else {
      return <div />;
    }
  };
  return (
    <div class="login">
      <h1>Prisijungimo forma</h1>
      <h1>{wrongData()}</h1>
      <form class="form-signin" onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onUsernameChange}
          placeholder="Vartotojo vardas"
          required="required"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onPassChange}
          placeholder="Slaptažodis"
          required="required"
        />
        <button type="submit" class="btn btn-primary btn-block btn-large">
          Prisijungti.
        </button>
      </form>
    </div>
  );
};
export default Login;
