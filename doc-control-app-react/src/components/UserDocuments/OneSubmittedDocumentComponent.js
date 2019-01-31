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
                <p>Būsena:</p>
            </div>
            <div className="col-3">
                <p>{props.state}</p>
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
            <div className="col-3">
                <a href="/" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
            </div>
        </div>
        </div >
    );
}

export default OneSubmittedDocumentComponent;