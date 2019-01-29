import React from 'react';
import { Link } from 'react-router-dom';

const ReviewDocumentsComponent = (props) => {
    var linkas = "/reviewDocuments/" + props.id;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <p>{props.author}</p>
                </div>
                <div className="col-2">
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
                    <p>{props.submitionDate}</p>
                </div>
                <div className="col-1">
                    <Link to={linkas}> <i class="fas fa-info-circle"></i> </Link>
                    <Link to={linkas}> <i class="fas fa-check-circle"></i> </Link>
                    <Link to={linkas}> <i class="fas fa-times-circle"></i> </Link>
                </div>
            </div>
        </div>
    );
}

export default ReviewDocumentsComponent;