import React from "react";
import svg from "../../css/images/Brain.png";

const Login = ({
  username,
  password,
  onUsernameChange,
  onPassChange,
  onSubmit,
  wrongUsernameOrPassword
}) => {
  let wrongData = () => {
    if (wrongUsernameOrPassword)
      return (
        <h6 className="wrong-pass-or-username text-danger">
          Neteisingai įvedėte vartotojo vardą arba slaptažodį
        </h6>
      );
    else {
      return <div />;
    }
  };
  return (
    <React.Fragment>
      <div className="page-holder d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
              <div className="pr-lg-5">
                <img src={svg} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-5 px-lg-4">
              <h1 className="text-base text-primary text-uppercase mb-4">
                Dokumentų Valdymo Sistema v 1.0.0
              </h1>
              <h2 className="mb-4">Sveiki sugrįžę!</h2>
              <h1>{wrongData()}</h1>
              <form id="loginForm" className="mt-4" onSubmit={e => onSubmit(e)}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onUsernameChange}
                    required="required"
                    placeholder="Vartotojo vardas"
                    className="form-control border-0 shadow form-control-lg"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={onPassChange}
                    placeholder="Slaptažodis"
                    required="required"
                    className="form-control border-0 shadow form-control-lg"
                  />
                </div>
                <div className="form-group mb-4" />
                <button type="submit" className="btn btn-primary shadow px-5">
                  Prisijungti.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
