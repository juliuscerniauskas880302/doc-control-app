import React from 'react';

const OneReviewDocumentComponent = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">   
                    <p>Autorius:</p>
                </div>
                <div className="col-3">
                    <p>{props.author}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">   
                    <p>Numeris:</p>
                </div>
                <div className="col-3">
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
                <div className="col-1">   
                    <p>Pridėtas failas:</p>
                </div>
                <div className="col-2">
                    <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
                </div>
            </div>
            <div className="row">
                <div className="col-3">   
                    <button className="btn btn-success" type="submit" onClick={props.handleAccept}>Patvirtinti</button> &nbsp;
                    <button className="btn btn-danger" type="submit" onClick={() => props.handleReject(props.id)}>Atmesti</button> &nbsp;
                    <a href="/reviewDocuments" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
                </div>
            </div>
        </div>
    );
}

export default OneReviewDocumentComponent;