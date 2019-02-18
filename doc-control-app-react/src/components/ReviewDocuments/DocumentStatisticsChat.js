import React from "react";

import CanvasJSReact from '../canvasjs-2.3.1/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let label1 = "Pateikta";
let value1 = 11;
let label2 = "Priimta";
let value2 = 14;
let label3 = "Atmesta";
let value3 = 5;

class DocumentStatisticsChat extends React.Component {
    constructor (props){
        super(props);
    }
    
    componentDidMount() {
        console.log("Spausdinu iš ChartComponent");
        console.log("Chart konteinerio vardas yra " + this.props.chartContainerName);
        console.log("Submitted yra - " + this.props.submitted)
        // Originali eilutė -> var chart = new CanvasJS.Chart("chartContainer", {
        var chart = new CanvasJS.Chart(this.props.chartContainerName, {
            animationEnabled: true,
            // title: {
            //     text: "Pateikti dokumentai"
            // },
            data: [
                {
                    type: "column",
                    dataPoints: [
                        { label: label1, y: this.props.submitted },
                        { label: label2, y: this.props.accepted },
                        { label: label3, y: this.props.rejected }
                    ]
                }
            ]
        });
        chart.render();
    }
    render() {
        return (
            <div id={this.props.chartContainerName} style={{ height: 360 + "px", width: 50 + "%" }}>
            </div>
        );
    }
}

export default DocumentStatisticsChat;                       