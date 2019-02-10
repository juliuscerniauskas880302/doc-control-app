import React from "react";

export default function NewDocumentTypeComponent(props) {
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="pt-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">
                  Naujas dokumento tipas
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={e => props.onCLickAddNewDocTypeHandler(e)}>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">
                      Dokumento tipo pavadinimas
                    </label>
                    <div className="col-md-9">
                      <input
                        placeholder="Dokumento tipo pavadinimas"
                        onChange={event => props.onValueChangeHandler(event)}
                        value={props.state.title}
                        type="text"
                        name="title"
                        className="form-control form-control-success"
                        pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-9 ml-auto">
                      <input
                        type="submit"
                        value="Pridėti"
                        className="btn btn-primary"
                      />
                    </div>
                  </div>
                </form>
                <div className="form-group row">
                  <div className="col-md-9 ml-auto">
                    <input
                      onClick={() => props.goBack()}
                      type="submit"
                      value="Grįžti atgal"
                      className="btn btn-warning"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="line" />
        <section className="">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">
                  Atnaujinti dokumentų tipus
                </h3>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">
                    Visi dokumentų tipai
                  </label>
                  <div className="col-md-9 ml-auto select">
                    <select
                      className="form-control rounded"
                      multiple=""
                      size="5"
                      onChange={props.onValueChangeHandler}
                      name="selectedDocTypeTitle"
                    >
                      {props.showAllDocumentTypes()}
                    </select>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <form onSubmit={e => props.onClickUpdateHandler(e)}>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">
                      Naujas pavadinimas
                    </label>
                    <div className="col-md-9">
                      <input
                        placeholder="Naujas pavadinimas"
                        onChange={event => props.onValueChangeHandler(event)}
                        type="text"
                        name="newTitle"
                        value={props.state.newTitle}
                        className="form-control form-control-success"
                        pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-9 ml-auto">
                      <input
                        type="submit"
                        value="Atnaujinti"
                        className="btn btn-primary"
                      />
                    </div>
                  </div>
                </form>
                <div className="form-group row">
                  <div className="col-md-9 ml-auto">
                    <input
                      onClick={() => props.onDeleteCLickHandler()}
                      type="submit"
                      value="Ištrinti"
                      className="btn btn-danger"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-9 ml-auto">
                    <input
                      onClick={props.onClickGoBack}
                      type="submit"
                      value="Grįžti atgal"
                      className="btn btn-warning"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
