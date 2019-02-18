import React from 'react';
import DocumentStatisticsComponent from './DocumentStatisticsComponent';
import axios from 'axios';

class DocumentStatisticsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "2019-01-01",
            endDate: "2019-12-31",
            submittedDocumentsList: [],
            acceptedDocumentsList: [],
            rejectedDocumentsList: [],
            loading: "Kraunami duomenys. Prašome palaukti."
        };
    }

    handleChangeOfStartDate = event => {
        this.setState({ startDate: event.target.value });
        console.log("Pradžios data yra " + this.state.startDate);
    };

    handleChangeOfEndDate = event => {
        this.setState({ endDate: event.target.value });
        console.log("Pabaigos data yra " + this.state.endDate);
    };

    handleChartUpdate() {
        console.log("Atnaujinu diagramų duomenis")
    }

    componentDidMount() {
        //TODO
        //dabar neteisingu adresu ima dokumentus - ima is esamo vartotojo sukurtu dokumentų
        //perdaryti, kad imtų iš tų dokumentų, kuriuos vartotojas gali peržiūrėti.
        axios
            .get("http://localhost:8081/api/users/docs/submitted")
            .then(response => {
                console.log("Esu statistikoje");
                var acceptedOnly = response.data.filter(item => item.documentState === "ACCEPTED");
                var rejectedOnly = response.data.filter(item => item.documentState === "REJECTED");
                console.log("acceptedOnly masyvo ilgis - " + acceptedOnly.length);
                console.log("Pirmas dokumentas su statusu ACCEPTED: " + acceptedOnly[0].documentState);
                console.log("Pirmas dokumentas su statusu REJECTED: " + rejectedOnly[0].documentState);
                this.setState({ submittedDocumentsList: response.data.map(item => item.title) });
                console.log(
                    "Koks atiduodamas dokumentų tipų sąrašas (naujame dokumente)?"
                );
                console.log(this.state.typeList);
            })
            .catch(error => {
                console.log("KLAIDA!!!!" + error);
            });
    }

    render() {
        var dataFromServer = [{
            documentType: "Atostogų prašymas",
            submitted: 15,
            accepted: 16,
            rejected: 5
        },
        {
            documentType: "Pašalpos prašymas",
            submitted: 5,
            accepted: 6,
            rejected: 5
        },
        {
            documentType: "Prašymas padidinti atlyginimą",
            submitted: 13,
            accepted: 4,
            rejected: 6
        },
        ];
        var statisticsCardList = dataFromServer.map((item, index) => {
            return (
                <DocumentStatisticsComponent
                    key={index}
                    idName={"docType" + index}
                    documentType={item.documentType}
                    submitted={item.submitted}
                    accepted={item.accepted}
                    rejected={item.rejected}
                />
            );
        })

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
                                            <label htmlFor="startingDate">Nuo: </label>
                                            <input type="date" name="startingDate" value={this.state.startDate} onChange={this.handleChangeOfStartDate}></input>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="endingDate">Nuo: </label>
                                            <input type="date" name="endingDate" value={this.state.endDate} onChange={this.handleChangeOfEndDate}></input>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn submitButton" type="submit">
                                                Atnaujinti
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            {statisticsCardList}
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