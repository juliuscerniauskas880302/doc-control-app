import React from "react";
import { Link } from "react-router-dom";

const OneReviewDocumentComponent = props => {
  let AdditionalFiles =
    props.paths &&
    props.paths.map((path, i) => {
      return (
        path && (
          <p key={i}>
            <span className="customFileSpan"> {path}</span> &nbsp;{" "}
            <i
              className="mygtukas fas fa-arrow-circle-down fa-2x"
              id={path}
              title="Atsisiųsti pridėtą failą"
              onClick={event => props.fileDownloadHandler(event)}
            />
          </p>
        )
      );
    });
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="pt-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h6 className="text-uppercase mb-0">Peržiūrimas dokumentas</h6>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-3">
                    <p>Autorius:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.author}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Numeris:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.id}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Pavadinimas:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.title}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Aprašymas:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.description}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Tipas:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.type}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Būsena:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.state}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Pateikimo data:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.submissionDate}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-3">
                    <p>Pridėtas failas:</p>
                  </div>
                  <div className="col-9">
                    <p>
                      {props.path} &nbsp;{" "}
                      <i
                        className="mygtukas fas fa-arrow-circle-down fa-2x"
                        id={props.path}
                        title="Atsisiųsti pridėtą failą"
                        onClick={event => props.fileDownloadHandler(event)}
                      />
                    </p>
                  </div>
                </div>
                {props.paths && props.paths.length !== 0 ? (
                  <div className="form-group row">
                    <div className="col-3">
                      <p>Papildomos bylos:</p>
                    </div>
                    <div className="col-9 ">{AdditionalFiles} </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn submitButtonAlt"
                      type="submit"
                      onClick={props.handleAccept}
                    >
                      Patvirtinti
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn deleteButton"
                      type="submit"
                      onClick={() => props.handleReject(props.id)}
                    >
                      Atmesti
                    </button>{" "}
                    &nbsp;
                    <Link
                      to={`/reviewDocuments`}
                      className="btn goBackButton"
                      type="button"
                    >
                      Atgal
                    </Link>{" "}
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OneReviewDocumentComponent;
