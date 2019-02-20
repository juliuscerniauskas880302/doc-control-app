import React from "react";
import nonImage from "../../css/images/no-profile-image.png";

export default function Profile(props) {
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="pt-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">Vartotojo profilis</h3>
              </div>
              <div className="card-body">
                <div className="form-group row d-flex justify-content-center">
                  <div className="ui card">
                    <div className="image">
                      <img src={nonImage} alt="profile" />
                    </div>
                    <div className="content">
                      <div className="header">Julius Cerniauskas</div>
                      <div className="meta">
                        <span className="date">
                          Administratorius arba vartotojas
                        </span>
                      </div>
                    </div>
                    <div className="extra content">
                      <div>
                        <div className="ui list">
                          <div className="item">
                            <i className="users icon" />
                            <div className="content">
                              <div className="header">Grupes</div>
                              <div className="description">
                                Grupes, kurioms priklauso vartotojas
                              </div>
                              <div className="list">
                                <div className="item">
                                  <i className="user icon" />
                                  <div className="content">
                                    <div className="header">
                                      Kebabu valgytojai
                                    </div>
                                  </div>
                                </div>
                                <div className="item">
                                  <i className="user icon" />
                                  <div className="content">
                                    <div className="header">
                                      Kimarintoju kampelis
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <i className="file pdf outline icon" />
                            <div className="content">
                              <div className="header">Dokumentu tipai</div>
                              <div className="description">
                                Dokumentu tipai, kuriuos vartotojas gali kurti
                              </div>
                              <div className="list">
                                <div className="item">
                                  <i className="edit outline icon" />
                                  <div className="content">
                                    <div className="header">
                                      Atostogu prasymas
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="list">
                                <div className="item">
                                  <i className="edit outline icon" />
                                  <div className="content">
                                    <div className="header">
                                      Algos padidinimas
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <i className="file pdf icon" />
                            <div className="content">
                              <div className="header">Dokumentu tipai</div>
                              <div className="description">
                                Dokumentu tipai, kuriuos vartotojas gali
                                patvirtinti
                              </div>
                              <div className="list">
                                <div className="item">
                                  <i className="calendar check outline icon" />
                                  <div className="content">
                                    <div className="header">
                                      Atostogu prasymas
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="list">
                                <div className="item">
                                  <i className="calendar check outline icon" />
                                  <div className="content">
                                    <div className="header">
                                      Algos padidinimas
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
