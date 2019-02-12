import React from "react";
import { Link } from "react-router-dom";

const OneSubmittedDocumentComponent = props => {
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
                <div className="row">
                  <div className="col-5">
                    <p>Numeris:</p>
                  </div>
                  <div className="col-7">
                    <p>{props.id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>Pavadinimas:</p>
                  </div>
                  <div className="col-7">
                    <p>{props.title}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>Aprašymas:</p>
                  </div>
                  <div className="col-7">
                    <p>{props.description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>Tipas:</p>
                  </div>
                  <div className="col-7">
                    <p>{props.type}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>Pateikimo data:</p>
                  </div>
                  <div className="col-7">
                    <p>{props.submissionDate}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>Būsena:</p>
                  </div>
                  <div className="col-7">
                    <p>{props.state}</p>
                  </div>
                </div>
                {props.state === "Atmestas" && (
                  <div className="row">
                    <div className="col-5">
                      <p>Atmetimo priežastis:</p>
                    </div>
                    <div className="col-7">
                      <p>{props.rejectionReason}</p>
                    </div>
                  </div>
                )}
                {props.state === "Priimtas" && (
                  <div className="row">
                    <div className="col-5">
                      <p>Priėmė:</p>
                    </div>
                    <div className="col-7">
                      <p>{props.reviewer}</p>
                    </div>
                  </div>
                )}
                {props.approvalDate !== "" && (
                  <div className="row">
                    <div className="col-5">
                      <p>Priėmimo data:</p>
                    </div>
                    <div className="col-7">
                      <p>{props.approvalDate}</p>
                    </div>
                  </div>
                )}
                {props.state === "Atmestas" && (
                  <div className="row">
                    <div className="col-5">
                      <p>Atmetė:</p>
                    </div>
                    <div className="col-7">
                      <p>{props.reviewer}</p>
                    </div>
                  </div>
                )}
                {props.rejectionDate !== "" && (
                  <div className="row">
                    <div className="col-5">
                      <p>Atmetimo data:</p>
                    </div>
                    <div className="col-7">
                      <p>{props.rejectionDate}</p>
                    </div>
                  </div>
                )}
                <div className="row">
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
                </div>
                <div className="row">
                  <div className="col-12">
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
