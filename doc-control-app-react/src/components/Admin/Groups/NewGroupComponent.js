import React from "react";

export default function NewGroupComponent(props) {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="panel panel-primary">
          <div className="panel-body">
            <h3 className="text-on-pannel text-primary">
              <strong className="text-uppercase"> New Group </strong>
            </h3>
            <div className="mx-1">
              <form onSubmit={props.onSubmitAdd}>
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                  </div>
                  <input
                    onChange={props.onChange}
                    type="text"
                    name={props.newTitle}
                    value={props.newTitleValue}
                    className="form-control"
                    pattern={props.pattern}
                    required
                  />
                </div>

                <div className="input-group mb-1">
                  <button type="buton" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>
              <br />
              <div className="input-group mb-1">
                <button
                  type="buton"
                  className="btn btn-warning"
                  onClick={props.OnClickGoBack}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="panel panel-primary">
          <div className="panel-body">
            <h3 className="text-on-pannel text-primary">
              <strong className="text-uppercase"> Update Group </strong>
            </h3>
            <div className="mx-1">
              <span className="input-group-text group">All groups</span>
              <div className="input-group mb-1">
                <select
                  className="form-control"
                  size="5"
                  onChange={props.onChange}
                  name="selectedGroupTitle"
                >
                  {props.showGroups}
                </select>
              </div>
            </div>
            <br />
            <div className="mx-1">
              <form onSubmit={props.onSubmitUpdate}>
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">New title</span>
                  </div>
                  <input
                    onChange={props.onChange}
                    type="text"
                    name={props.nameForUpdate}
                    value={props.valueForUpdate}
                    className="form-control"
                    pattern={props.pattern}
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
                  onClick={props.onDeleteClick}
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
