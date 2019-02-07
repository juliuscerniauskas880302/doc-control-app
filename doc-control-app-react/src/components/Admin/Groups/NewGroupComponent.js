import React from "react";

export default function NewGroupComponent(props) {
  return (
    <div className="container">
      <section id="content">
        <h1>Nauja grupė</h1>
        <form onSubmit={props.onSubmitAdd}>
          <div className="input-group mb-1">
            <input
              placeholder="Pavadinimas"
              onChange={props.onChange}
              type="text"
              name={props.newTitle}
              value={props.newTitleValue}
              className="form-control"
              pattern={props.pattern}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Pridėti
          </button>
        </form>
        <br />
        <div className="input-group mb-1">
          <button
            type="buton"
            className="btn btn-warning"
            onClick={props.onClickGoBack}
          >
            Grįžti atgal
          </button>
        </div>
      </section>
      <div className="line" />
      <section id="content">
        <h1>Atnaujinti grupes</h1>
        <span className="groups">Visos grupės</span>
        <div className="input-group">
          <select
            className="form-control"
            size="5"
            onChange={props.onChange}
            name="selectedGroupTitle"
          >
            {props.showGroups}
          </select>
          <button
            type="buton"
            className="btn btn-danger"
            onClick={props.onDeleteClick}
          >
            Ištrinti
          </button>
        </div>
        <br />
        <form onSubmit={props.onSubmitUpdate}>
          <div className="input-group">
            <input
              placeholder="Naujas pavadinimas"
              onChange={props.onChange}
              type="text"
              name={props.nameForUpdate}
              value={props.valueForUpdate}
              className="form-control"
              pattern={props.pattern}
              required
            />
          </div>
          <button type="submit" className="btn btn-info">
            Atnaujinti
          </button>
        </form>
      </section>
    </div>
  );
}
