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

const charts = [
    someData, someData, someData, someData
]

export default function MedicalCharts() {
    return (
        <>
            <Col>
                <h1>MedicalCharts</h1>

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