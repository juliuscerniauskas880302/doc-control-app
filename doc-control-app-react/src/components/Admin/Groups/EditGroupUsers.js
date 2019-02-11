import React from "react";
import ButtonComponent from "../../Utilities/ButtonComponent";

export default function EditGroupUsers(props) {
  return (
    <div className="col-lg-12 mb-5">
      <div className="card">
        <div className="card-header">
          <h3 className="h6 text-uppercase mb-0">Vartotojų priskyrimas</h3>
        </div>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Visos grupės</label>

            <div className="col-md-9 ml-auto select">
              <select
                size="5"
                onChange={props.onChange}
                name="selectedGroupForAddUsers"
                multiple=""
                className="form-control rounded"
              >
                {props.showGroups}
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <ButtonComponent
            onClick={props.onClickGoBack}
            type="submit"
            value="Grįžti atgal"
            className="btn goBackButton"
          />
        </div>
      </div>
    </div>
  );
}
