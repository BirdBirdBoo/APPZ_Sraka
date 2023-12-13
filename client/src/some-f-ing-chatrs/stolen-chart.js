import moment from "moment";
import React, {useState} from "react";
import styled from "styled-components";
import {CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import {CustomTooltip} from "./custom-tooltip";
import {max} from "../utils";
import {Col} from "react-bootstrap";


const dateToUnix = (day, month, year) => {
    const toDate = moment(`${day}-${month}-${year}`, "DD-MM-YYYY").toDate();
    return toDate.getTime();
};


const formatData = data =>
    data.map(({id, amount, day, month, year}) => {
        return {
            id,
            value: amount,
            time: dateToUnix(day, month, year)
        };
    });

const Box = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const BtnBox = styled.div`
    display: flex;
`;

// noinspection CssInvalidPseudoSelector
const BtnDateUnit = styled.p`
    color: green;
    border-bottom: ${p => p.activekey === p.getactivekey && `1px solid green`};
    cursor: pointer;
    margin-right: 1rem;

    &::last-of-type {
        margin-right: 0;
    }
`;

export const DateSeriesChart = ({getData, endTime = undefined}) => {
    // Constants
    const oneMonth = 30;
    const threeMonths = 90;
    const oneYear = 365;
    const oneMonthStr = "one-month";
    const threeMonthsStr = "three-months";
    const oneYearStr = "one-year";
    // State
    const [getDateUnit, setDateUnit] = useState(oneMonth);
    const [getActiveKey, setActiveKey] = useState(oneMonthStr);
    // Click handlers
    const handleDateUnit = (days, activeKey) => () => {
        setActiveKey(activeKey);
        setDateUnit(days);
    };
    const handleOneMonth = handleDateUnit(oneMonth, oneMonthStr);
    const handleThreeMonths = handleDateUnit(threeMonths, threeMonthsStr);
    const handleOneYear = handleDateUnit(oneYear, oneYearStr);
    // Filter data
    const formattedData = formatData(getData);
    console.log("formattedData", formattedData)
    if (endTime === undefined) {
        if (formattedData.length > 0) {
            endTime = moment(max(formattedData, ({time}) => time));
        } else {
            endTime = moment();
        }
    }
    console.log(endTime);
    const filteredData = formattedData.filter(({time}) =>
        moment(time).isAfter(endTime.subtract(getDateUnit, "days"))
    );
    const sortedData = filteredData.sort((a, b) => b.time - a.time);

    // JSX
    return (
        <Col style={{minWidth: "24vw", maxWidth: "24vw", height: "40vh", marginBottom: 48}}>
            <ResponsiveContainer>
                <ScatterChart>
                    <XAxis
                        dataKey="time"
                        domain={["auto", "auto"]}
                        name="Time"
                        tickFormatter={unixTime => moment(unixTime).format("DD-MM-YYYY")}
                        type="number"
                    />
                    <YAxis dataKey="value" name="Value"/>
                    <Scatter
                        data={sortedData}
                        line={{stroke: "#d3d3d3"}}
                        lineType="joint"
                        lineJointType="monotoneX"
                        name="Values"
                    />
                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                </ScatterChart>
            </ResponsiveContainer>

            <BtnBox className='justify-content-center ms-6'>
                <BtnDateUnit
                    getactivekey={getActiveKey}
                    activekey={oneMonthStr}
                    onClick={handleOneMonth}
                >
                    1M
                </BtnDateUnit>
                <BtnDateUnit
                    getactivekey={getActiveKey}
                    activekey={threeMonthsStr}
                    onClick={handleThreeMonths}
                >
                    3M
                </BtnDateUnit>
                <BtnDateUnit
                    getactivekey={getActiveKey}
                    activekey={oneYearStr}
                    onClick={handleOneYear}
                >
                    1Y
                </BtnDateUnit>
            </BtnBox>
        </Col>
    );
};