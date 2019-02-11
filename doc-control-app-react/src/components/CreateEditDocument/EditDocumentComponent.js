import React from 'react';

const EditDocumentComponet = (props) => {
    let optionList = props.typeList.map ( v => (
        //<option value = {v}>{v}</option>
        <option key={v}>{v}</option>
    ))

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-row">
                <div className="col-md-12 mb-12">
                    <h5>Esamo dokumento redagavimas</h5>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault01">Dokumento pavadinimas:</label>
                    <input type="text" className="form-control" id="validationDefault01" placeholder="Įveskite pavadinimą" value={props.title} required onChange={props.handleChangeOfTitle}></input>
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
                <div className="col-md-4 mb-3">   
                    <p>Pridėtas failas:</p>
                    <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="Upload file">Pasirinkite naują pridedamą failą</label>
                    <div className="input-group mb-1">
                        <input
                            onChange={props.onFileSelectHandler}
                            id="Upload file"
                            name="selectedFiles"
                            className="input-file"
                            type="file"
                            accept=".pdf, .jpg, .png"
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" type="submit">Išsaugoti</button> &nbsp;
            <button className="btn btn-danger" type="button" onClick={props.handleDelete}>Ištrinti</button> &nbsp;
            <a href="/createdDocuments" className="btn btn-dark" role="button" aria-pressed="true">Atmesti pakeitimus</a>
        </form>
    );
}

export default EditDocumentComponet;