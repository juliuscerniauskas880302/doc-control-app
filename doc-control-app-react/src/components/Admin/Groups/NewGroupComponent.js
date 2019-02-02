import React from "react";

export default function NewGroupComponent(props) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <section id="content">
          <div className="panel-body">
            <h1>New Group</h1>
            <div className="mx-1">
              <form onSubmit={props.onSubmitAdd}>
                <div className="input-group mb-1">
                  <input
                    placeholder="Title"
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
                  <input type="submit" value="add" />
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
        </section>
      </div>

      <div className="row justify-content-center">
        <section id="content">
          <div className="panel-body">
            <h1>Update group</h1>
            <div className="mx-1">
              <h3>All groups</h3>

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
                  <input
                    placeholder="New title"
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
                  <input type="submit" value="update" />
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
        </section>
      </div>
    </div>
  );
}
