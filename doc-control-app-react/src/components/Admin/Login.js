import React, { Component } from "react";
import "./Login.css";

const Login = (
  { username, pass, onUsernameChnage, onPassChange, onSubmit },
  context
) => {
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="user"
          value={username}
          onChange={onPassChange}
          placeholder="Username"
          required="required"
        />
        <input
          type="password"
          name="password"
          value={pass}
          onChange={onUsernameChnage}
          placeholder="Password"
          required="required"
        />
        <button type="buton" className="btn btn-primary btn-block btn-large">
          Log me in.
        </button>
      </form>
    </div>
  );
};

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <div className="login">
//         <h1>Login</h1>
//         <form method="post">
//           <input
//             type="text"
//             name="user"
//             placeholder="Username"
//             required="required"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required="required"
//           />
//           <button type="submit" className="btn btn-primary btn-block btn-large">
//             Log me in.
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

export default Login;
