import React from 'react';
import { Link } from 'react-router-dom';

const UserCreatedDocumentsComponent = (props) => {
    var linkas = "/createdDocuments/" + props.id;
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
                    <p>{props.creationDate}</p>
                </div>
                <div className="col-2">
                    <Link to={linkas}> <i class="fas fa-info-circle"></i> </Link>
                    <Link to={`/admin/Documents/${props.id}`}> <i class="far fa-edit"></i> </Link>
                    <Link to={linkas}> <i class="fas fa-trash"></i> </Link>
                    <Link to={linkas}> <i class="fas fa-file-signature"></i> </Link>

                     {/* Čia yra UTF simboliai-ikonos
                    <Link to={linkas}>&#9997;</Link> |&nbsp;
                    <Link to={linkas}>&#128465;</Link> |&nbsp;
                    <Link to={linkas}>&#8505;</Link> |&nbsp;
                    <Link to={linkas}>&#128196; </Link> */}
                </div>
            </div>
        </div>
    );
}

export default UserCreatedDocumentsComponent;