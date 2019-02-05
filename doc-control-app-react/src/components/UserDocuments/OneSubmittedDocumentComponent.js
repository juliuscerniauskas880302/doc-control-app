import React from 'react';

const OneSubmittedDocumentComponent = (props) => {
    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-1">
                    <p>Numeris:</p>
                </div>
                <div className="col-1">
                    <p>{props.id}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-1">
                    <p>Pavadinimas:</p>
                </div>
                <div className="col-3">
                    <p>{props.title}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <p>Aprašymas:</p>
                </div>
                <div className="col-3">
                    <p>{props.description}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <p>Tipas:</p>
                </div>
                <div className="col-3">
                    <p>{props.type}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <p>Pateikimo data:</p>
                </div>
                <div className="col-3">
                    <p>{props.submissionDate}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <p>Būsena:</p>
                </div>
                <div className="col-3">
                    <p>{props.state}</p>
                </div>
            </div>
            {props.reviewer.length > 0 &&
                <div className="row">
                    <div className="col-1">
                        <p>Priėmė:</p>
                    </div>
                    <div className="col-3">
                        <p>{props.reviewer}</p>
                    </div>
                </div>
            }
            {props.approvalDate !== "" &&
            <div className="row">
                <div className="col-1">
                    <p>Priėmimo data:</p>
                </div>
                <div className="col-3">
                    <p>{props.approvalDate}</p>
                </div>
            </div>
            }
            <div className="row">
                <div className="col-1">
                    <p>Pridėtas failas:</p>
                </div>
                <div className="col-2">
                    <p>{props.filename} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>

                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <a href="/" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
                </div>
            </div>
        </div >
    );
}

export default OneSubmittedDocumentComponent;