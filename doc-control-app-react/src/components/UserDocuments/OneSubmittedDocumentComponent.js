import React from "react";
import { Link } from "react-router-dom";

const OneSubmittedDocumentComponent = props => {
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
                <h6 className="text-uppercase mb-0">Pateiktas dokumentas</h6>
              </div>
              <div className="card-body">
                <div className=" form-group row">
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
                    <p>Pateikimo data:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.submissionDate}</p>
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
                {props.state === "Atmestas" && (
                  <div className="form-group row">
                    <div className="col-3">
                      <p>Atmetimo priežastis:</p>
                    </div>
                    <div className="col-9">
                      <p>{props.rejectionReason}</p>
                    </div>
                  </div>
                )}
                {props.state === "Priimtas" && (
                  <div className="form-group row">
                    <div className="col-3">
                      <p>Priėmė:</p>
                    </div>
                    <div className="col-9">
                      <p>{props.reviewer}</p>
                    </div>
                  </div>
                )}
                {props.approvalDate !== "" && (
                  <div className="form-group row">
                    <div className="col-3">
                      <p>Priėmimo data:</p>
                    </div>
                    <div className="col-9">
                      <p>{props.approvalDate}</p>
                    </div>
                  </div>
                )}
                {props.state === "Atmestas" && (
                  <div className="form-group row">
                    <div className="col-3">
                      <p>Atmetė:</p>
                    </div>
                    <div className="col-9">
                      <p>{props.reviewer}</p>
                    </div>
                  </div>
                )}
                {props.rejectionDate !== "" && (
                  <div className="form-grouprow">
                    <div className="col-3">
                      <p>Atmetimo data:</p>
                    </div>
                    <div className="col-9">
                      <p>{props.rejectionDate}</p>
                    </div>
                  </div>
                )}
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
                {/* <div className="row">
                  <div className="col-5">
                    <p>Pridėtas failas:</p>
                  </div>
                  <div className="col-7">
                    <p>
                      {props.path} &nbsp;{" "}
                      <i
                        className="mygtukas fas fa-download fa-2x"
                        title="Atsisiųsti pridėtą failą"
                        onClick={() => props.downloadHandler()}
                      />
                    </p>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-6 mx-auto">
                    <Link to={`/`} className="btn goBackButton" type="button">
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

    // <div className="container-fluid">

    // <div className="row">
    // <div className="col-1">
    // <p>Numeris:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.id}</p>
    // </div>
    // </div>

    // <div className="row">
    // <div className="col-1">
    // <p>Pavadinimas:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.title}</p>
    // </div>
    // </div>
    // <div className="row">
    // <div className="col-1">
    // <p>Aprašymas:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.description}</p>
    // </div>
    // </div>
    // <div className="row">
    // <div className="col-1">
    // <p>Tipas:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.type}</p>
    // </div>
    // </div>
    // <div className="row">
    // <div className="col-1">
    // <p>Pateikimo data:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.submissionDate}</p>
    // </div>
    // </div>
    // <div className="row">
    // <div className="col-1">
    // <p>Būsena:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.state}</p>
    // </div>
    // </div>
    // {props.state === "Rejected" &&
    // <div className="row">
    // <div className="col-1">
    // <p>Atmetimo priežastis:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.rejectionReason}</p>
    // </div>
    // </div>
    // }
    // {props.state === "Accepted" &&
    // <div className="row">
    // <div className="col-1">
    // <p>Priėmė:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.reviewer}</p>
    // </div>
    // </div>
    // }
    // {props.approvalDate !== "" &&
    // <div className="row">
    // <div className="col-1">
    // <p>Priėmimo data:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.approvalDate}</p>
    // </div>
    // </div>
    // }
    // {props.state === "Rejected" &&
    // <div className="row">
    // <div className="col-1">
    // <p>Atmetė:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.reviewer}</p>
    // </div>
    // </div>
    // }
    // {props.rejectionDate !== "" &&
    // <div className="row">
    // <div className="col-1">
    // <p>Atmetimo data:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.rejectionDate}</p>
    // </div>
    // </div>
    // }
    // <div className="row">
    // <div className="col-1">
    // <p>Pridėtas failas:</p>
    // </div>
    // <div className="col-3">
    // <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
    // </div>
    // </div>
    // <div className="row">
    // <div className="col-3">
    // <a href="/" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
    // </div>
    // </div>
    // </div >
  );
};

export default OneSubmittedDocumentComponent;
