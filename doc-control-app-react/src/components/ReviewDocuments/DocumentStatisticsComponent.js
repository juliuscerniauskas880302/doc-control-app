import React from 'react';
import { Link } from 'react-router-dom';
import DocumentStatisticsChart from './DocumentStatisticsChart';
//import './DocumentStyle.css';

const DocumentStatisticsComponent = (props) => {
    var statisticsCardList = props.statisticsData.map((item, index) => {
        //console.log("Spausdinu iš diagramų masyvo darymo");
        //console.log("Item pirmas - " + item.document);
        return (
            <DocumentStatisticsChart
                key={index}
                idName={"docType" + index}
                documentType={item.documentTypeTitle}
                submitted={item.submittedCount}
                accepted={item.acceptedCount}
                rejected={item.rejectedCount}
            />
        );
    })
    return (
        <div className="col-6">
                <div>
                {/* Originalus <div className="card"> */}
                    {/* <div className="card-header">
                <h6 className="text-uppercase mb-0">{props.documentType}</h6> 
            </div> */}
                    <div>
                    {/* Originalus <div className="card-body"> */}
                        {statisticsCardList}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default DocumentStatisticsComponent;