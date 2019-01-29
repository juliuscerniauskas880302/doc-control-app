import React from "react";
import "./User.css";
import Swal from "sweetalert2";

const User = props => {
  let confirmDeltetion = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );
        props.delete();
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  return (
    <div className="col-sm-4">
      <div className="card card-flip h-100">
        <div className="card-front text-white bg-primary">
          <div className="card-body">
            <i className="fas fa-user fa-5x float-right" />
            <h4 className="card-title">{props.firstname}</h4>
            <h4 className="card-title">{props.lastname}</h4>
            <p className="card-text">
              <i className="fas fa-at mx-1" />
              {props.email}
            </p>
            <i className="fas fa-unlock-alt mx-1" />
            {props.isAdmin}
          </div>
        </div>
        <div className="card-back">
          <div className="card-body text-primary ">
            <div className="d-flex justify-content-around">
              <i
                className="fas fa-trash-alt fa-2x"
                onClick={() => confirmDeltetion()}
              />
              <i className="fas fa-user-edit fa-2x" onClick={props.update} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
