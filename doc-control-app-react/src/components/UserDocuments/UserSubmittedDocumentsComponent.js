import React from 'react';
import { Link } from 'react-router-dom';

const UserSubmittedDocumentsComponent = (props) => {
    var linkas = "/submittedDocuments/" + props.id;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">
                    <p>{props.id}</p>
                </div>
                <div className="col-2">
                    <p>{props.title}</p>
                </div>
                <div className="col-2">
                    <p>{props.description}</p>
                </div>
                <div className="col-1">
                    <p>{props.type}</p>
                </div>
                <div className="col-1">
                    <p>{props.state}</p>
                </div>
                <div className="col-1">
                    <p>{props.submitionDate}</p>
                </div>
                <div className="col-1">
                    <Link to={linkas}> <i className="fas fa-info-circle"></i> </Link>
                </div>
            </div>
        </div>
    );
}

export default UserSubmittedDocumentsComponent;