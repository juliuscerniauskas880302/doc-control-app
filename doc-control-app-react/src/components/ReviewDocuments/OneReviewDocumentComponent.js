import React from 'react';
import { Link } from 'react-router-dom';

const OneReviewDocumentComponent = (props) => {
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
                                <div className="row">
                                    <div className="col-5">
                                        <p>Autorius:</p>
                                    </div>
                                    <div className="col-7">
                                        <p>{props.author}</p>
                                    </div>
                                </div>
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
                                        <p>Būsena:</p>
                                    </div>
                                    <div className="col-7">
                                        <p>{props.state}</p>
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
                                        <p>Pridėtas failas:</p>
                                    </div>
                                    <div className="col-7">
                                        <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-success" type="submit" onClick={props.handleAccept}>Patvirtinti</button> &nbsp;
                                        <button className="btn btn-danger" type="submit" onClick={() => props.handleReject(props.id)}>Atmesti</button> &nbsp;
                                        <Link to={`/reviewDocuments`} className="btn btn-dark" type="button">Atgal</Link> &nbsp;
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
        //             <p>Autorius:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.author}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Numeris:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.id}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Pavadinimas:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.title}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Aprašymas:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.description}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Tipas:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.type}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Būsena:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.state}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Pateikimo data:</p>
        //         </div>
        //         <div className="col-3">
        //             <p>{props.submissionDate}</p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-1">
        //             <p>Pridėtas failas:</p>
        //         </div>
        //         <div className="col-2">
        //             <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-3">
        //             <button className="btn btn-success" type="submit" onClick={props.handleAccept}>Patvirtinti</button> &nbsp;
        //             <button className="btn btn-danger" type="submit" onClick={() => props.handleReject(props.id)}>Atmesti</button> &nbsp;
        //             <a href="/reviewDocuments" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
        //         </div>
        //     </div>
        // </div>
    );
}

export default OneReviewDocumentComponent;