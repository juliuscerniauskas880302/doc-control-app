import React from "react";

export default function NewPasswordComponent(props) {
  return (
    <div className="row justify-content-center">
      <section id="content">
        <h1>Password</h1>

        <form onSubmit={event => props.onSubmit(event)}>
          <div className="input-group-prepend">
            <h3>New Password</h3>
          </div>
          <div className="input-group mb-1">
            <input
              placeholder="Enter new password"
              onChange={event => props.onChange(event)}
              type="password"
              name={props.name}
              className="form-control"
              pattern={props.pattern}
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>
          <br />
          <div className="input-group mb-1">
            <input type="submit" value="Save changes" />
          </div>
        </form>
        <br />
        <div className="input-group mb-1">
          <button
            type="buton"
            className="btn btn-warning"
            onClick={() => props.onClick()}
          >
            Go back
          </button>
        </div>
      </section>
    </div>
  );
}
