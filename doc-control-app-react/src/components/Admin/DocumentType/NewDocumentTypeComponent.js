import React from "react";

export default function NewDocumentTypeComponent(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <section id="content">
          <div className="panel-body">
            <h1>New Document Type</h1>
            <div className="mx-1">
              <form onSubmit={e => props.onCLickAddNewDocTypeHandler(e)}>
                <div className="input-group mb-1">
                  <input
                    placeholder="Document title"
                    onChange={event => props.onValueChangeHandler(event)}
                    value={props.state.title}
                    type="text"
                    name="title"
                    className="form-control"
                    pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                    required
                  />
                </div>
                <div className="input-group mb-1">
                  <input type="submit" value="add" />
                </div>
              </form>
              <br />
              <div className="input-group mb-1">
                <button
                  type="buton"
                  className="btn btn-warning"
                  onClick={() => props.goBack()}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/*  */}
      <div className="row justify-content-center">
        <section id="content">
          <div className="panel-body">
            <h1>Update Document Type</h1>
            <div className="mx-1">
              <h3>All document types</h3>
              <div className="input-group mb-1">
                <select
                  className="form-control"
                  size="5"
                  onChange={props.onValueChangeHandler}
                  name="selectedDocTypeTitle"
                >
                  {props.showAllDocumentTypes()}
                </select>
              </div>
            </div>
            <br />
            <div className="mx-1">
              <form onSubmit={e => props.onClickUpdateHandler(e)}>
                <div className="input-group mb-1">
                  <input
                    placeholder="New title"
                    onChange={event => props.onValueChangeHandler(event)}
                    type="text"
                    name="newTitle"
                    value={props.state.newTitle}
                    className="form-control"
                    pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                    required
                  />
                </div>

                <div className="input-group mb-1">
                  <input type="submit" value="Update" />
                </div>
              </form>
              <br />
              <div className="input-group mb-1">
                <button
                  type="buton"
                  className="btn btn-danger"
                  onClick={() => props.onDeleteCLickHandler()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
