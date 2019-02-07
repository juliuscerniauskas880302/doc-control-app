import React from "react";

export default function NewPasswordComponent(props) {
  return (
    <section id="content">
      <h1>Keisti slaptažodį</h1>

      <form onSubmit={event => props.onSubmit(event)}>
        <div className="input-group-prepend">
          <h3>Naujas slaptažodis</h3>
        </div>
        <div>
          <input
            placeholder="Įveskite naują  slaptažodį"
            onChange={event => props.onChange(event)}
            type="password"
            name={props.name}
            className="form-control"
            pattern={props.pattern}
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
        </div>

        <button type="submit" className="btn btn-success my-1">
          Pakeisti
        </button>
      </form>

      <button
        type="buton"
        className="btn btn-warning my-1"
        onClick={() => props.onClick()}
      >
        Grįžti atgal
      </button>
    </section>
  );
}
