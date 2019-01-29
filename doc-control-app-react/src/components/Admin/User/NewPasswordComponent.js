import React from "react";

export default function NewPasswordComponent(props) {
  return (
    <div className="row justify-content-center">
      <div className="panel panel-primary">
        <div className="panel-body">
          <h3 className="text-on-pannel text-primary">
            <strong className="text-uppercase"> Password</strong>
          </h3>
          <div className="mx-1">
            <form onSubmit={event => props.onSubmit(event)}>
              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text">New Passwrod</span>
                </div>
                <input
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
                <button type="buton" className="btn btn-success">
                  Save changes
                </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
