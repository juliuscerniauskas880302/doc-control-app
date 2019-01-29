import React from "react";

export default function NewDocumentTypeComponent(props) {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="panel panel-primary">
          <div className="panel-body">
            <h3 className="text-on-pannel text-primary">
              <strong className="text-uppercase"> New Doc Type </strong>
            </h3>
            <div className="mx-1">
              <form onSubmit={e => props.onCLickAddNewDocTypeHandler(e)}>
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                  </div>
                  <input
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
                  <button type="buton" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>

              {/*  */}
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
        </div>
      </div>

      {/*  */}
      <div className="row justify-content-center">
        <div className="panel panel-primary">
          <div className="panel-body">
            <h3 className="text-on-pannel text-primary">
              <strong className="text-uppercase"> Update Doc Type </strong>
            </h3>
            <div className="mx-1">
              <span className="input-group-text group">All document types</span>
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
                  <div className="input-group-prepend">
                    <span className="input-group-text">New title</span>
                  </div>
                  <input
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
                  <button type="buton" className="btn btn-info">
                    Update
                  </button>
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
        </div>
      </div>
    </div>
  );
}
