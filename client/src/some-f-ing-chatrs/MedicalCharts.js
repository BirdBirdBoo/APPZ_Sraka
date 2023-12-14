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


const charts = [
    someData, someData, hemoglobin_data, meanDailyHeartRate
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