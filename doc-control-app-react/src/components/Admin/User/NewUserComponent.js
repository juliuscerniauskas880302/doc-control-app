import React from "react";

export default function NewUserComponent(props) {
  return (
    <div className="container">
      <section id="content">
        <h1>Naujo vartotojo forma</h1>
        <form onSubmit={e => props.onSubmit(e)}>
          <div>
            <input
              placeholder="Vardas"
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
              placeholder="Pavardė"
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
              placeholder="Vartotojo vardas"
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
              placeholder="El. paštas"
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
              placeholder="Slaptažodis"
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
                Ar administratorius?
              </option>
              <option value={false}>Taip</option>
              <option value={true}>Ne</option>
            </select>
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            Išsaugoti
          </button>
        </form>
      </section>
    </div>
  );
}
