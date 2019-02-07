import React from "react";

export default function NewDocumentTypeComponent(props) {
  return (
    <div className="container">
      <section id="content">
        <h1>Naujas dokumento tipas</h1>

        <form onSubmit={e => props.onCLickAddNewDocTypeHandler(e)}>
          <div className="input-group mb-1">
            <input
              placeholder="Dokumento tipo pavadinimas"
              onChange={event => props.onValueChangeHandler(event)}
              value={props.state.title}
              type="text"
              name="title"
              className="form-control"
              pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
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
            onClick={() => props.goBack()}
          >
            Grįžti atgal
          </button>
        </div>
      </section>

      <div className="line" />
      <section id="content">
        <h1>Atnaujinti dokumentų tipus</h1>
        <span className="groups">Visi dokumentų tipai</span>
        <div className="input-group">
          <select
            className="form-control"
            size="5"
            onChange={props.onValueChangeHandler}
            name="selectedDocTypeTitle"
          >
            {props.showAllDocumentTypes()}
          </select>

          <button
            type="buton"
            className="btn btn-danger"
            onClick={() => props.onDeleteCLickHandler()}
          >
            Ištrinti
          </button>
        </div>
        <br />
        <form onSubmit={e => props.onClickUpdateHandler(e)}>
          <div className="input-group">
            <input
              placeholder="Naujas pavadinimas"
              onChange={event => props.onValueChangeHandler(event)}
              type="text"
              name="newTitle"
              value={props.state.newTitle}
              className="form-control"
              pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
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
