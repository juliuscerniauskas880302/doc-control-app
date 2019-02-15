import React from 'react';
import DocumentStatisticsComponent from './DocumentStatisticsComponent';

class DocumentStatisticsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "2019.01.01",
            endDate: "2019.12.31",
            loading: "Kraunami duomenys. Prašome palaukti."
        };
    }

    handleChartUpdate() {
        console.log("Atnaujinu diagramų duomenis")
    }

    render() {
        return (
            <div className="page-holder w-100 d-flex flex-wrap">
                <div className="container-fluid px-xl-5">
                    <section className="pt-5">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="text-uppercase mb-0">Pateiktų dokumentų statistika</h6>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        Pasirinkite laikotarpį:
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <label for="startingDate">Nuo: </label>
                                            <input type="date" name="startingDate"></input>
                                        </div>
                                        <div className="col-md-2">
                                            <label for="endingDate">Nuo: </label>
                                            <input type="date" name="endingDate"></input>
                                        </div>
                                        <div className="col-md-9">
                                            <button className="btn submitButton" type="submit">
                                                Atnaujinti
                                                     </button>
                                        </div>








                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <DocumentStatisticsComponent />
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


}

export default DocumentStatisticsContainer;