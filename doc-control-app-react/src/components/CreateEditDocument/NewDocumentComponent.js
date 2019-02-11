import React from 'react';
import FileTransferPopup from './FileTransferPopup';
import "./FileTransferStyles.css";

const NewDocumentComponet = (props) => {

    let optionList = props.typeList.map(v => (
        //<option value = {v}>{v}</option>
        <option key={v}>{v}</option>
    ))

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-row">
                <div className="col-md-12 mb-12">
                    <h5>Naujo dokumento suvedimas</h5>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault01">Dokumento pavadinimas:</label>
                    <input type="text" className="form-control" id="validationDefault01" placeholder="Įveskite pavadinimą" value={props.title} pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$" required onChange={props.handleChangeOfTitle}></input>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault02">Dokumento aprašymas:</label>
                    <input type="text" className="form-control" id="validationDefault02" placeholder="Įveskite aprašymą" value={props.description} required onChange={props.handleChangeOfDescription}></input>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault03">Dokumento tipas</label>
                    <select className="form-control" value={props.type} required onChange={props.handleChangeOfType}>
                        <option hidden>Pasirinkite...</option>
                        {optionList}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-2 mb-2">
                    <label htmlFor="Upload file">Pasirinkite pridedamą failą</label>
                    <div className="input-group mb-1">
                        <input
                            onChange={props.onFileSelectHandler}
                            id="Upload file"
                            name="selectedFiles"
                            className="input-file"
                            type="file"
                            required
                            accept=".pdf, .jpg, .png"
                        />
                    </div>
                </div>
                <div className="col-md-1 mb-1">
                   <FileTransferPopup show={props.isOpen}
                                        onClose={props.closeFileTransferPopup}
                                        percentage={props.percentage}
                   />
                </div>
            </div>
            {/* <div className="form-row">
                <div className="col-md-4 mb-3">
                <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Prisegti</button>
                </div>
            </div> */}

            <button className="btn btn-primary" type="submit" >Išsaugoti</button>
        </form>
    );
}

export default NewDocumentComponet;