import React from 'react';
import UserStatisticsChart from './UserStatisticsChart';

const UserStatisticsComponent = (props) => {
    var statisticsCardList = props.statisticsData.map((item, index) => {
        return (
            <UserStatisticsChart
                key={item.documentTypeTitle + item.topSubmittingUsers.length}
                idName={"docType" + index}
                documentType={item.documentTypeTitle}
                topSubmittingUsers={item.topSubmittingUsers}
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

export default UserStatisticsComponent;