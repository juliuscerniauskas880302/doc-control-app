import React from "react";
import FileTransferPopup from "./FileTransferPopup";
import "./FileTransferStyles.css";

const NewDocumentComponet = props => {
  let optionList = props.typeList.map(v => (
    //<option value = {v}>{v}</option>
    <option key={v}>{v}</option>
  ));

  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="py-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">
                  Naujo dokumento suvedimas
                </h3>
              </div>
              <div className="card-body">
                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento pavadinimas:
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-success"
                        id="validationDefault01"
                        placeholder="Įveskite pavadinimą"
                        //pattern={props.namePattern}
                        value={props.title}
                        pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                        required
                        onChange={props.handleChangeOfTitle}
                        //title={props.namePatternTitle}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento aprašymas:
                    </label>
                    <div className="col-md-4">
                      <textarea
                        rows="4"
                        cols="50"
                        type="text"
                        className="form-control form-control-success"
                        //name="lastname"
                        placeholder="Įveskite aprašymą"
                        //pattern={props.namePattern}
                        //title={props.namePatternTitle}
                        value={props.description}
                        required
                        onChange={props.handleChangeOfDescription}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento tipas:
                    </label>
                    <div className="col-md-3">
                      <select
                        className="form-control form-control-success"
                        value={props.type}
                        required
                        onChange={props.handleChangeOfType}
                      >
                        <option hidden>Pasirinkite...</option>
                        {optionList}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Pasirinkite pridedamą failą:
                    </label>
                    <div className="col-md-2">
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
                    <div className="col-md-3">
                      <FileTransferPopup
                        show={props.isOpen}
                        onClose={props.closeFileTransferPopup}
                        percentage={props.percentage}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-9">
                      <button className="btn submitButton" type="submit">
                        Išsaugoti
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    // <form onSubmit={props.handleSubmit}>
    //     <div className="form-row">
    //         <div className="col-md-12 mb-12">
    //             <h5>Naujo dokumento suvedimas</h5>
    //         </div>
    //     </div>
    //     <div className="form-row">
    //         <div className="col-md-4 mb-3">
    //             <label htmlFor="validationDefault01">Dokumento pavadinimas:</label>
    //             <input type="text" className="form-control" id="validationDefault01" placeholder="Įveskite pavadinimą" value={props.title} pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$" required onChange={props.handleChangeOfTitle}></input>
    //         </div>
    //     </div>
    //     <div className="form-row">
    //         <div className="col-md-4 mb-3">
    //             <label htmlFor="validationDefault02">Dokumento aprašymas:</label>
    //             <input type="text" className="form-control" id="validationDefault02" placeholder="Įveskite aprašymą" value={props.description} required onChange={props.handleChangeOfDescription}></input>
    //         </div>
    //     </div>

    //     <div className="form-row">
    //         <div className="col-md-4 mb-3">
    //             <label htmlFor="validationDefault03">Dokumento tipas</label>
    //             <select className="form-control" value={props.type} required onChange={props.handleChangeOfType}>
    //                 <option hidden>Pasirinkite...</option>
    //                 {optionList}
    //             </select>
    //         </div>
    //     </div>

    //     <div className="form-row">
    //         <div className="col-md-2 mb-2">
    //             <label htmlFor="Upload file">Pasirinkite pridedamą failą</label>
    //             <div className="input-group mb-1">
    //                 <input
    //                     onChange={props.onFileSelectHandler}
    //                     id="Upload file"
    //                     name="selectedFiles"
    //                     className="input-file"
    //                     type="file"
    //                     required
    //                     accept=".pdf, .jpg, .png"
    //                 />
    //             </div>
    //         </div>
    //         <div className="col-md-1 mb-1">
    //             <FileTransferPopup show={props.isOpen}
    //                 onClose={props.closeFileTransferPopup}
    //                 percentage={props.percentage}
    //             />
    //         </div>
    //     </div>
    //     {/* <div className="form-row">
    //         <div className="col-md-4 mb-3">
    //         <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Prisegti</button>
    //         </div>
    //     </div> */}

    //     <button className="btn btn-primary" type="submit" >Išsaugoti</button>
    // </form>
  );
};

export default NewDocumentComponet;
