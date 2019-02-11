import React from "react";

const ButtonComponent = props => {
  return (
    <div className="form-group row">
      <div className="col-md-9 ml-auto">
        <input
          type={props.type}
          value={props.value}
          className={props.className}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

export default ButtonComponent;
