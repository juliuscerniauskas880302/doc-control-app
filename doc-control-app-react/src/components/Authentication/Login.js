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
      return (
        <div className="wrong-pass-or-username">Wrong username or password</div>
      );
  };

  return (
    // <div class="wrapper">
    //   <form class="form-signin" onSubmit={e => onSubmit(e)}>
    //     <h2 class="form-signin-heading">Prisijungimas</h2>

    //     <input
    //       type="text"
    //       name="username"
    //       value={username}
    //       onChange={onUsernameChange}
    //       placeholder="Vartotojo vardas"
    //       required="required"
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={onPassChange}
    //       placeholder="Slaptažodis"
    //       required="required"
    //     />
    //     <button class="btn btn-lg btn-primary btn-block" type="submit">
    //       Prisijungti
    //     </button>
    //   </form>
    // </div>

    <div class="login">
      <h1>Prisijungimo forma</h1>
      {wrongData()}
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

    // <div className="container">
    //   <section id="content">
    //     <form onSubmit={e => onSubmit(e)}>
    //       <h1>Login Form</h1>
    //       {wrongData()}
    //       <div>
    //         <input
    //           type="text"
    //           name="username"
    //           value={username}
    //           onChange={onUsernameChange}
    //           placeholder="Username"
    //           required="required"
    //         />
    //       </div>
    //       <div>
    //         <input
    //           type="password"
    //           name="password"
    //           value={password}
    //           onChange={onPassChange}
    //           placeholder="Password"
    //           required="required"
    //         />
    //       </div>
    //       <div>
    //         <input type="submit" value="Log in" />
    //       </div>
    //     </form>
    //   </section>
    // </div>
  );
};
export default Login;
