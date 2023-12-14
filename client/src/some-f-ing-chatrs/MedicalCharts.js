import {DateSeriesChart} from "./stolen-chart";
import {Col, Row} from "react-bootstrap";

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
    {"id": 14, "amount": 72, "day": 14, "month": 1, "year": 2019}
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
    realisticBodyTemperatureData,
]

export default function MedicalCharts() {
    return (
        <>
            <Col style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: '100%'
            }}>
                <h1 className="p-3">Графіки показників</h1>

                <Row>
                    {charts.map((data, index) => {
                        return (
                            <DateSeriesChart key={index} getData={data}/>
                        )
                    })}
                </Row>
            </Col>
        </>
    );
}