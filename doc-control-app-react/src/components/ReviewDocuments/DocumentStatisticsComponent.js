import React from "react";

import CanvasJSReact from '../canvasjs-2.3.1/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let label1 = "Atostogų prašymas";
let value1 = 11;
let label2 = "Atleidimo iš darbo prašymas";
let value2 = 14;

class DocumentStatisticsComponent extends React.Component {
    componentDidMount() {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            // title: {
            //     text: "Pateikti dokumentai"
            // },
            data: [
                {
                    type: "bar",
                    dataPoints: [
                        { label: label1, y: value1 },
                        { label: label2, y: value2 },
                        { label: "Pašalpos prašymas", y: 25 },
                        { label: "Prašymas suteikti tarnybinį automobilį", y: 30 },
                        { label: "Prašymas padidinti atlyginimą", y: 28 }
                    ]
                }
            ]
        });
        chart.render();
    }
    render() {
        return (
            <div id="chartContainer" style={{ height: 360 + "px", width: 50 + "%" }}>
            </div>
        );
    }
}

export default DocumentStatisticsComponent;                       