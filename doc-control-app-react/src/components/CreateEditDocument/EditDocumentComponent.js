import React from 'react';

const EditDocumentComponet = (props) => {
    let optionList = props.typeList.map ( v => (
        <option value = {v}>{v}</option>
    ))

    return (
        <form >
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
                    <select class="form-control" value={props.type} required onChange={props.handleChangeOfType}>
                        <option hidden>Pasirinkite...</option>
                        {optionList}
                    </select>
                </div>
            </div>


            <button className="btn btn-primary" type="submit" onClick={props.handleSubmit}>Išsaugoti</button> &nbsp;
            <button className="btn btn-danger" onClick={props.handleDelete}>Ištrinti</button>
        </form>
    );
}

export default EditDocumentComponet;