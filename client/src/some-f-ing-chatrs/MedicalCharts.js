import {DateSeriesChart, TimeSeriesChart} from "./stolen-chart";
import {Col, Row} from "react-bootstrap";
import {React, useContext, useEffect, useState} from "react";
import AuthContext from "../AuthContext";
import axios from "axios";
import AnalysisTable from "../APPZComponents/AnalysisTable";
import moment from "moment";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatDate } from "../dateFormatter";

import "../styles/styles.css"

const someData = [
    {
        id: 1,
        amount: 100,
        day: 1,
        month: 1,
        year: 2019
    },
    {
        id: 2,
        amount: 200,
        day: 2,
        month: 1,
        year: 2019
    },
    {
        id: 3,
        amount: 300,
        day: 3,
        month: 1,
        year: 2019
    },
    {
        id: 4,
        amount: 400,
        day: 4,
        month: 1,
        year: 2019
    },
    {
        id: 5,
        amount: 500,
        day: 5,
        month: 1,
        year: 2019
    },
    {
        id: 6,
        amount: 600,
        day: 6,
        month: 1,
        year: 2019
    },
    {
        id: 7,
        amount: 700,
        day: 7,
        month: 1,
        year: 2019
    },
    {
        id: 8,
        amount: 800,
        day: 8,
        month: 1,
        year: 2019
    },
    {
        id: 9,
        amount: 900,
        day: 9,
        month: 1,
        year: 2019
    },
    {
        id: 10,
        amount: 1000,
        day: 10,
        month: 1,
        year: 2019
    },
    {
        id: 11,
        amount: 1100,
        day: 11,
        month: 1,
        year: 2019
    },
    {
        id: 12,
        amount: 1200,
        day: 24,
        month: 1,
        year: 2018
    },
    {
        id: 13,
        amount: 1300,
        day: 28,
        month: 12,
        year: 2018
    },
    {
        id: 14,
        amount: 1400,
        day: 10,
        month: 2,
        year: 2019
    },
    {
        id: 15,
        amount: 1500,
        day: 15,
        month: 2,
        year: 2019
    },
]

const meanDailyHeartRate = [
    {"id": 1, "amount": 70, "day": 1, "month": 1, "year": 2019},
    {"id": 2, "amount": 75, "day": 2, "month": 1, "year": 2019},
    {"id": 3, "amount": 80, "day": 3, "month": 1, "year": 2019},
    {"id": 4, "amount": 72, "day": 4, "month": 1, "year": 2019},
    {"id": 5, "amount": 78, "day": 5, "month": 1, "year": 2019},
    {"id": 6, "amount": 85, "day": 6, "month": 1, "year": 2019},
    {"id": 7, "amount": 88, "day": 7, "month": 1, "year": 2019},
    {"id": 8, "amount": 90, "day": 8, "month": 1, "year": 2019},
    {"id": 9, "amount": 82, "day": 9, "month": 1, "year": 2019},
    {"id": 10, "amount": 79, "day": 10, "month": 1, "year": 2019},
    {"id": 11, "amount": 75, "day": 11, "month": 1, "year": 2019},
    {"id": 12, "amount": 70, "day": 12, "month": 1, "year": 2019},
    {"id": 13, "amount": 68, "day": 13, "month": 1, "year": 2019},
    {"id": 14, "amount": 72, "day": 14, "month": 1, "year": 2019},
    {"id": 15, "amount": 78, "day": 15, "month": 1, "year": 2019},
    {"id": 16, "amount": 80, "day": 16, "month": 1, "year": 2019},
    {"id": 17, "amount": 85, "day": 17, "month": 1, "year": 2019},
    {"id": 18, "amount": 88, "day": 18, "month": 1, "year": 2019},
    {"id": 19, "amount": 92, "day": 19, "month": 1, "year": 2019},
    {"id": 20, "amount": 85, "day": 20, "month": 1, "year": 2019},
    {"id": 21, "amount": 80, "day": 21, "month": 1, "year": 2019},
    {"id": 22, "amount": 78, "day": 22, "month": 1, "year": 2019},
    {"id": 23, "amount": 75, "day": 23, "month": 1, "year": 2019},
    {"id": 24, "amount": 70, "day": 24, "month": 1, "year": 2019},
    {"id": 25, "amount": 68, "day": 25, "month": 1, "year": 2019},
    {"id": 26, "amount": 72, "day": 26, "month": 1, "year": 2019},
    {"id": 27, "amount": 75, "day": 27, "month": 1, "year": 2019},
    {"id": 28, "amount": 78, "day": 28, "month": 1, "year": 2019},
    {"id": 29, "amount": 80, "day": 29, "month": 1, "year": 2019},
    {"id": 30, "amount": 85, "day": 30, "month": 1, "year": 2019},
    {"id": 31, "amount": 88, "day": 31, "month": 1, "year": 2019},
    {"id": 32, "amount": 90, "day": 1, "month": 2, "year": 2019},
    {"id": 33, "amount": 85, "day": 2, "month": 2, "year": 2019},
    {"id": 34, "amount": 80, "day": 3, "month": 2, "year": 2019},
    {"id": 35, "amount": 78, "day": 4, "month": 2, "year": 2019},
    {"id": 36, "amount": 75, "day": 5, "month": 2, "year": 2019},
    {"id": 37, "amount": 72, "day": 6, "month": 2, "year": 2019},
    {"id": 38, "amount": 70, "day": 7, "month": 2, "year": 2019},
    {"id": 39, "amount": 68, "day": 8, "month": 2, "year": 2019},
    {"id": 40, "amount": 75, "day": 9, "month": 2, "year": 2019},
    {"id": 41, "amount": 78, "day": 10, "month": 2, "year": 2019},
    {"id": 42, "amount": 80, "day": 11, "month": 2, "year": 2019},
    {"id": 43, "amount": 85, "day": 12, "month": 2, "year": 2019},
    {"id": 44, "amount": 88, "day": 13, "month": 2, "year": 2019},
    {"id": 45, "amount": 90, "day": 14, "month": 2, "year": 2019}
]

const hemoglobin_data = [
    {"id": 1, "amount": 12.5, "day": 1, "month": 1, "year": 2019},
    {"id": 2, "amount": 12.8, "day": 15, "month": 1, "year": 2019},
    {"id": 3, "amount": 13.2, "day": 1, "month": 2, "year": 2019},
    {"id": 4, "amount": 13.5, "day": 15, "month": 2, "year": 2019},
    {"id": 5, "amount": 13.7, "day": 1, "month": 3, "year": 2019},
    {"id": 6, "amount": 14.0, "day": 15, "month": 3, "year": 2019},
    {"id": 7, "amount": 14.2, "day": 1, "month": 4, "year": 2019},
    {"id": 8, "amount": 14.5, "day": 15, "month": 4, "year": 2019},
    {"id": 9, "amount": 14.8, "day": 1, "month": 5, "year": 2019},
    {"id": 10, "amount": 15.0, "day": 15, "month": 5, "year": 2019},
    {"id": 11, "amount": 15.3, "day": 1, "month": 6, "year": 2019},
    {"id": 12, "amount": 15.6, "day": 15, "month": 6, "year": 2019},
]

const realisticBodyTemperatureData = [
    {"id": 1, "amount": 36.5, "metric": "Celsius", "hourOfDay": 8},
    {"id": 2, "amount": 36.7, "metric": "Celsius", "hourOfDay": 9},
    {"id": 3, "amount": 37.2, "metric": "Celsius", "hourOfDay": 10},
    {"id": 4, "amount": 36.8, "metric": "Celsius", "hourOfDay": 11},
    {"id": 5, "amount": 37.5, "metric": "Celsius", "hourOfDay": 12},
    {"id": 6, "amount": 38.2, "metric": "Celsius", "hourOfDay": 13},
    {"id": 7, "amount": 38.5, "metric": "Celsius", "hourOfDay": 14},
    {"id": 8, "amount": 38.8, "metric": "Celsius", "hourOfDay": 15},
    {"id": 9, "amount": 37.3, "metric": "Celsius", "hourOfDay": 16},
    {"id": 10, "amount": 36.9, "metric": "Celsius", "hourOfDay": 17},
    {"id": 11, "amount": 36.7, "metric": "Celsius", "hourOfDay": 18},
    {"id": 12, "amount": 36.5, "metric": "Celsius", "hourOfDay": 19},
    {"id": 13, "amount": 36.4, "metric": "Celsius", "hourOfDay": 20},
    {"id": 14, "amount": 36.6, "metric": "Celsius", "hourOfDay": 21}
];

const charts = [
    someData, someData, hemoglobin_data, meanDailyHeartRate
]

const timeChart = [
    realisticBodyTemperatureData
]

export default function MedicalCharts({patientid}) {
    let authContext = useContext(AuthContext);
    let [charts, setCharts] = useState([]);

    function fetchCharts(id) {
        console.log("id", patientid)

        axios.get('https://localhost:7130/api/Charts/getAnalyzes', {
            params: {
                "patientId": id
            }
        })
            .then(res => {
                const _charts = res.data;
                setCharts(_charts);
                console.log(_charts);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (!patientid) {
            patientid = authContext.userAsPatientId;
        }
        fetchCharts(patientid);
    }, []);

    function selectUnitFmt(units) {
        if (String(units).toLowerCase() === "celsius") {
            return (value) => `${value}°C`;
        }

        return (value) => `${value}`;
    }

    function selectTooltipFmt(units) {
        if (String(units).toLowerCase() === "celsius") {
            return celsiusTimeFormat;
        }

        return (time, value) => [`${value}`, `Time: ${moment(time).format("HH:MM")}`];
    }

    function celsiusTimeFormat(time, value) {
        return [`${value} °C`, `Time: ${moment(time).format("HH:MM")}`];
    }
    
    const exportPDF = async () => {
        const input = document.getElementById('charts-container');
        const inputChildrens = input.children;
        const pdf = new jsPDF();
        
        for (let i = 0; i < inputChildrens.length; i++) {
            const children = inputChildrens[i];
            const canvas = await html2canvas(children, {windowHeight: '1200px'});
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0);
    
            if (i < inputChildrens.length - 1) {
                pdf.addPage();
            }
        }
        
        pdf.save("download.pdf");
    }

    return (
        <>
            <Col style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: '100%'
            }}>
                <h1 className="p-3">Графіки показників</h1>
                <Row id="charts-container">
                    {charts.map((c, index) => {
                        let title = c.name;
                        let date = c.date;
                        const data = c.properties;
                        const units = data[0].metric;
                        const unitFormatFunc = selectUnitFmt(units);
                        const tooltipFormatFunc = selectTooltipFmt(units);
                        console.log(data)
                        return (
                            <TimeSeriesChart key={index} getData={data} title={title +" Дата збору даних: "+ formatDate(date)}
                                             tooltipFormatFunc={tooltipFormatFunc}
                                             unitFormatFunc={unitFormatFunc}/>
                        )

                    })}
                </Row>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-style-pdf-export" onClick={exportPDF}>Експортувати у PDF</button>
                </div>
            </Col>
        </>
    );
}