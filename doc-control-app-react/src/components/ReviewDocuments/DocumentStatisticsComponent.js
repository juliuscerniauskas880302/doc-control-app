import React from 'react';
import { Link } from 'react-router-dom';
import DocumentStatisticsChar from './DocumentStatisticsChat';
//import './DocumentStyle.css';

const DocumentStatisticsComponent = (props) => {
    return (
        <div className="card">
            {/* <div className="card-header">
                <h6 className="text-uppercase mb-0">{props.documentType}</h6> 
            </div> */}
            <div className="card-body">
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#" + props.idName} aria-expanded="false" aria-controls={props.idName}>
                    {props.documentType}
                </button>
                <div className="collapse" id={props.idName}>
                    <div className="card card-body">
                        <DocumentStatisticsChar
                            chartContainerName={"chartContainer" + props.idName}
                            submitted={props.submitted}
                            accepted={props.accepted}
                            rejected={props.rejected}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DocumentStatisticsComponent;