import React from "react";

export default function Select(props) {
  return (
    <div>
      <span className="input-group-text groups">{props.title}</span>
      <div className="input-group mb-1">
        <select
          multiple
          className="form-control"
          size="5"
          onChange={props.onChange}
          name={props.name}
        >
          {props.options}
        </select>
        <div className="input-group ">
          <button
            type="buton"
            className={props.buttonType}
            onClick={props.onClick}
          >
            {props.buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}
