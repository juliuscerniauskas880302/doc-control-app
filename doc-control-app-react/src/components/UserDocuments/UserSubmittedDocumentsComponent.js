import React from 'react';
import { Link } from 'react-router-dom';
import './DocumentStyle.css';

const UserSubmittedDocumentsComponent = (props) => {
    var linkas = "/submittedDocuments/" + props.id;
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{props.type}</td>
            <td>{props.state}</td>
            <td>{props.submissionDate}</td>
            <td>
                <Link style={{ textDecoration: 'none', color: 'black', cursor: 'default' }} to={linkas}> <i className="fas fa-info-circle fa-2x" title="Dokumento informacija"></i> </Link> &nbsp;
            </td>
        </tr>


        // <div className="container-fluid">
        //     <div className="row">
        //         <div className="col-2">
        //             <p>{props.id}</p>
        //         </div>
        //         <div className="col-2">
        //             <p>{props.title}</p>
        //         </div>
        //         <div className="col-2">
        //             <p>{props.description}</p>
        //         </div>
        //         <div className="col-1">
        //             <p>{props.type}</p>
        //         </div>
        //         <div className="col-1">
        //             <p>{props.state}</p>
        //         </div>
        //         <div className="col-1">
        //             <p>{props.submissionDate}</p>
        //         </div>
        //         <div className="col-1">
        //             <Link to={linkas}> <i className="fas fa-info-circle"></i> </Link>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-12">
        //             <hr/>
        //         </div>
        //     </div>
        // </div>
    );
}

export default UserSubmittedDocumentsComponent;