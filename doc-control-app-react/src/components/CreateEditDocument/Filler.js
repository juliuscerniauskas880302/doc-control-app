import React from 'react';
import './FileTransferStyles.css';

const Filler = (props) => {
    return <div className="filler" style={{width: `${props.percentage}%`}}>{props.percentage} %</div>
}

export default Filler;