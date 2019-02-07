import React from "react";
import "./User.css";
import Swal from "sweetalert2";

const User = props => {
  let confirmDeltetion = () => {
    Swal.fire({
      title: "Ar tikrai norite ištrinti?",
      // text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Taip, ištrinti!",
      cancelButtonText: "Ne, palitki"
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "Ištrinta!",
          "Vartotojas pašalintas iš duomenų bazės."
          // "success"
        );
        props.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Atšaukta", "Vartotojo duomenys palikti");
      }
    });
  };

  return (
    <tr>
      <td>{props.number}</td>
      <td>{props.firstname}</td>
      <td>{props.lastname}</td>
      <td>{props.email}</td>
      <td>
        <i className="fas fa-unlock-alt mx-1 fa-2x" />
        {props.isAdmin}
      </td>
      <td>
        <i className="fas fa-info mx-1 fa-2x" onClick={props.update} />

        <i
          className="fas fa-user-times mx-1 fa-2x "
          onClick={() => confirmDeltetion()}
        />
      </td>
    </tr>
  );
};

export default User;
