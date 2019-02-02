import React from "react";

export default function Select(props) {
  return (
    <div className="py-3">
      <div className="input-group-prepend">
        <h3>{props.title}</h3>
      </div>

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
          <input
            type="submit"
            onClick={props.onClick}
            value={props.buttonTitle}
          />
        </div>
      </div>
    </div>
  );
}
