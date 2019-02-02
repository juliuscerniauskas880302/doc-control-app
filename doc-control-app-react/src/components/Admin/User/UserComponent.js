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
    <div className="col-sm-4 my-3">
      <div className="user user-flip h-100">
        <div className="user-front text-white">
          <div id="content">
            <i className="fas fa-user fa-5x" />
            <h4>{props.firstname}</h4>
            <h4>{props.lastname}</h4>
            <h5>
              <i className="fas fa-at mx-1" />
              {props.email}
            </h5>
            <h5>
              <i className="fas fa-unlock-alt mx-1" />
              {props.isAdmin}
            </h5>
          </div>
        </div>
        <div className="user-back">
          <div id="content">
            <i
              className="fas fa-trash-alt fa-2x mx-2"
              onClick={() => confirmDeltetion()}
            />
            <i className="fas fa-user-edit fa-2x mx-2" onClick={props.update} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
