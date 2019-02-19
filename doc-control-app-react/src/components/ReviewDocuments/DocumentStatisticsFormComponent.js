import React from 'react';
import { Link } from 'react-router-dom';

const DocumentStatisticsFormComponent = (props) => {
    let optionList = props.typeList.map(v => (
        <option value={v.id}>{v.title}</option>
    ));
    return (
        <form onSubmit={props.handleChartUpdate}>
            <div className="form-row justify-content-md-center">
                Pasirinkite laikotarpį:
            </div>
            <div className="form-row justify-content-md-center">
                <label htmlFor="startingDate">Nuo: </label>
                <input type="date" name="startingDate" value={props.startDate} onChange={props.handleChangeOfStartDate}></input>
                <label htmlFor="endingDate">Nuo: </label>
                <input type="date" name="endingDate" value={props.endDate} onChange={props.handleChangeOfEndDate}></input>
            </div>
            <div className="form-row justify-content-md-center">
                <div className="form-group">
                    <label htmlFor="docTypes">Pasirinkite dokumentų tipus:</label>
                    <select multiple className="form-control" id="docTypes" onChange={props.handleChangeOfSelectedDocTypes}>
                       {optionList}
                    </select>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <button className="btn btn-primary" type="submit">
                    Gauti duomenis
                    </button>
            </div>
        </form>
    );
}

export default DocumentStatisticsFormComponent;