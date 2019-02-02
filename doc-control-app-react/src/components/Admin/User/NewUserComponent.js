import React from "react";

export default function NewUserComponent(props) {
  return (
    <div className="container">
      <section id="content">
        <h1>New User Form</h1>
        <form onSubmit={e => props.onSubmit(e)}>
          <div>
            <input
              placeholder="First name"
              onChange={event => props.onChange(event)}
              type="text"
              name="firstname"
              className="form-control"
              pattern={props.namePattern}
              title={props.namePatternTitle}
              required
            />
          </div>
          <div>
            <input
              placeholder="Last name"
              onChange={event => props.onChange(event)}
              type="text"
              name="lastname"
              className="form-control"
              pattern={props.namePattern}
              title={props.namePatternTitle}
              required
            />
          </div>
          <div>
            <input
              placeholder="Username"
              onChange={event => props.onChange(event)}
              type="text"
              name="username"
              className="form-control"
              pattern={props.usernamePattern}
              title={props.usernamePatternTitle}
              required
            />
          </div>
          <div>
            <input
              placeholder="Email"
              onChange={event => props.onChange(event)}
              type="email"
              name="email"
              className="form-control"
              pattern={props.emailPattern}
              title={props.emailPatternTitle}
              required
            />
          </div>
          <div>
            <input
              placeholder="Password"
              onChange={event => props.onChange(event)}
              type="password"
              name="password"
              className="form-control"
              pattern={props.passwordPattern}
              title={props.passwordPatternTitle}
              required
            />
          </div>
          <div>
            <select
              onChange={event => props.onChange(event)}
              type="text"
              name="isAdmin"
              className="form-control"
              required
            >
              <option defaultValue="Is Admin" disabled>
                Is Admin
              </option>
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </div>
          <br />
          <div className="input-group mb-1">
            <input type="submit" value="add" />
          </div>
        </form>
      </section>
    </div>
  );
}

// return (
//   <div className="row justify-content-center">
//     <div className="panel panel-primary">
//       <div className="panel-body">
//         <h3 className="text-on-pannel text-primary">
//           <strong className="text-uppercase"> New user </strong>
//         </h3>
//         <div className="mx-1">
//           <form onSubmit={e => props.onSubmit(e)}>
//             <div className="input-group mb-1">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">First Name</span>
//               </div>
//               <input
//                 onChange={event => props.onChange(event)}
//                 type="text"
//                 name="firstname"
//                 className="form-control"
//                 pattern={props.namePattern}
//                 title={props.namePatternTitle}
//                 required
//               />
//             </div>
//             <div className="input-group mb-1">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">Last Name</span>
//               </div>
//               <input
//                 onChange={event => props.onChange(event)}
//                 type="text"
//                 name="lastname"
//                 className="form-control"
//                 pattern={props.namePattern}
//                 title={props.namePatternTitle}
//                 required
//               />
//             </div>
//             <div className="input-group mb-1">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">Username</span>
//               </div>
//               <input
//                 onChange={event => props.onChange(event)}
//                 type="text"
//                 name="username"
//                 className="form-control"
//                 pattern={props.usernamePattern}
//                 title={props.usernamePatternTitle}
//                 required
//               />
//             </div>
//             <div className="input-group mb-1">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">@Email</span>
//               </div>
//               <input
//                 onChange={event => props.onChange(event)}
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 pattern={props.emailPattern}
//                 title={props.emailPatternTitle}
//                 required
//               />
//             </div>
//             <div className="input-group mb-1">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">Passwrod</span>
//               </div>
//               <input
//                 onChange={event => props.onChange(event)}
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 pattern={props.passwordPattern}
//                 title={props.passwordPatternTitle}
//                 required
//               />
//             </div>
//             <div className="input-group mb-1">
//               <div className="input-group-prepend">
//                 <span className="input-group-text">Admin</span>
//               </div>
//               <select
//                 onChange={event => props.onChange(event)}
//                 type="text"
//                 name="isAdmin"
//                 className="form-control"
//                 required
//               >
//                 <option defaultValue={false}>False</option>
//                 <option value={true}>True</option>
//               </select>
//             </div>
//             <br />
//             <div className="input-group mb-1">
//               <button type="buton" className="btn btn-warning">
//                 Add
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// );
