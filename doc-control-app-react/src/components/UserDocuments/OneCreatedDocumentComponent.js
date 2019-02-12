import React from "react";
import { Link } from "react-router-dom";

const OneCreatedDocumentComponent = props => {
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="pt-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h6 className="text-uppercase mb-0">Sukurtas dokumentas</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <p>Numeris:</p>
                  </div>
                  <div className="col-8">
                    <p>{props.id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Pavadinimas:</p>
                  </div>
                  <div className="col-8">
                    <p>{props.title}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Aprašymas:</p>
                  </div>
                  <div className="col-8">
                    <p>{props.description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Tipas:</p>
                  </div>
                  <div className="col-8">
                    <p>{props.type}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Sukūrimo data:</p>
                  </div>
                  <div className="col-8">
                    <p>{props.creationDate}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Pridėtas failas:</p>
                  </div>
                  <div className="col-8">
                    <p>
                      {props.path} &nbsp;{" "}
                      <button
                        className="btn submitButton"
                        type="button"
                        onClick={() => props.downloadHandler()}
                      >
                        Atsisiųsti
                      </button>
                    </p>
                    {/* <p>{props.filename} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Link
                      to={`/admin/Documents/${props.id}`}
                      className="btn submitButton"
                      type="button"
                    >
                      Redaguoti
                    </Link>{" "}
                    &nbsp;
                    <button
                      className="btn deleteButton"
                      type="submit"
                      onClick={props.handleDelete}
                    >
                      Trinti
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn submitButtonAlt"
                      type="submit"
                      onClick={props.handleSubmit}
                    >
                      Pateikti
                    </button>{" "}
                    &nbsp;
                    <Link
                      to={`/createdDocuments`}
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

    // <div className="container-fluid">
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Numeris:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.id}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Pavadinimas:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.title}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Aprašymas:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.description}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Tipas:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.type}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Sukūrimo data:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.creationDate}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Pridėtas failas:</p>
    //         </div>
    //         <div className="col-3">
    //             <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
    //             {/* <p>{props.filename} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p> */}
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-4">
    //             <Link to={`/admin/Documents/${props.id}`} className="btn btn-primary" type="button"> Redaguoti </Link> &nbsp;
    //             {/* <button className="btn btn-primary" type="submit" onClick={props.handleEdit}>Redaguoti</button> &nbsp;        */}
    //             <button className="btn btn-danger" type="submit" onClick={props.handleDelete}>Trinti</button> &nbsp;
    //             <button className="btn btn-success" type="submit" onClick={props.handleSubmit}>Pateikti</button> &nbsp;
    //             <a href="/createdDocuments" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
    //         </div>
    //     </div>
    //</div>
  );
};

export default OneCreatedDocumentComponent;
