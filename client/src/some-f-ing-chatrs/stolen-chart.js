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


const formatTimeData = data =>
    data.map(({id, amount, hourOfDay, minuteOfHour = 0}) => {
        return {
            id,
            value: amount,
            time: moment().hour(hourOfDay).minute(minuteOfHour).toDate().getTime()
        };
    });

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

export const DateSeriesChart = (
    {
        getData,
        endTime = undefined,
        title = "A chart, what more could you want",
        tooltipFormatFunc = defaultDateFormat
    }) => {
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

    if (endTime === undefined) {
        if (formattedData.length > 0) {
            endTime = moment(max(formattedData, ({time}) => time));
        } else {
            endTime = moment();
        }
    }
    const filteredData = formattedData.filter(({time}) =>
        moment(time).isAfter(endTime.clone().subtract(getDateUnit, "days"))
    );
    const sortedData = filteredData.sort((a, b) => b.time - a.time);

    // JSX
    return (
        <Col style={{minWidth: "24vw", maxWidth: "24vw", height: "40vh", marginBottom: 64}}
             className='py-2'>
            {title.split("\n").map((line, i) => <h5 key={i} className='ms-4'>{line}</h5>)}
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
                    <Tooltip content={<CustomTooltip fmtFunc={tooltipFormatFunc}/>}/>
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

    function defaultDateFormat(time, value) {
        console.log("value", value, "time", time)
        return [`Amt: ${value}`, `Date: ${moment(time).format("DD-MM-YYYY")}`];
    }
};

export const TimeSeriesChart = (
    {
        getData,
        endTime = undefined,
        title = "A time chart, what more could you want",
        unitFormatFunc = (v) => `${v}`,
        tooltipFormatFunc = defaultTimeFormat
    }) => {
    // Constants
    const oneHour = 60;
    const threeHours = 180;
    const oneDay = 60 * 24;
    const oneHourStr = "one-hour";
    const threeHoursStr = "three-hours";
    const oneDayStr = "one-day";
    // State
    const [getDateUnit, setDateUnit] = useState(threeHours);
    const [getActiveKey, setActiveKey] = useState(threeHoursStr);
    // Click handlers
    const handleTimeUnit = (minutes, activeKey) => () => {
        setActiveKey(activeKey);
        setDateUnit(minutes);
    };
    const handleOneHour = handleTimeUnit(oneHour, oneHourStr);
    const handleThreeHours = handleTimeUnit(threeHours, threeHoursStr);
    const handleOneDay = handleTimeUnit(oneDay, oneDayStr);

    // Filter data
    const formattedData = formatTimeData(getData);
    console.log("formattedData", formattedData);

    if (endTime === undefined) {
        if (formattedData.length > 0) {
            endTime = moment(max(formattedData, ({time}) => time));
        } else {
            endTime = moment();
        }
    }
    console.log('endTime', endTime, "startTime", endTime.clone().subtract(getDateUnit, "minutes"), "getDateUnit", getDateUnit, "minutes")
    const filteredData = formattedData.filter(({time}) =>
        moment(time).isAfter(endTime.clone().subtract(getDateUnit, "minutes")) &&
        moment(time).isBefore(endTime)
    );
    console.log("filteredData", filteredData)
    const sortedData = filteredData.sort((a, b) => b.time - a.time);

    // JSX
    return (
        <Col style={{minWidth: "24vw", maxWidth: "24vw", height: "40vh", marginBottom: 64}}
             className='py-2'>
            {title.split("\n").map((line, i) => <h5 key={i} className='ms-4'>{line}</h5>)}
            <ResponsiveContainer>
                <ScatterChart>
                    <XAxis
                        dataKey="time"
                        domain={["auto", "auto"]}
                        name="Time"
                        tickFormatter={unixTime => moment(unixTime).format("HH:mm")}
                        type="number"
                    />
                    <YAxis dataKey="value" name="Value" tickFormatter={unitFormatFunc}/>
                    <Scatter
                        data={sortedData}
                        line={{stroke: "#d3d3d3"}}
                        lineType="joint"
                        lineJointType="monotoneX"
                        name="Values"
                    />
                    <Tooltip content={<CustomTooltip fmtFunc={tooltipFormatFunc}/>}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                </ScatterChart>
            </ResponsiveContainer>

            <BtnBox className='justify-content-center ms-6'>
                <BtnDateUnit
                    getactivekey={getActiveKey}
                    activekey={oneHourStr}
                    onClick={handleOneHour}
                >
                    1H
                </BtnDateUnit>
                <BtnDateUnit
                    getactivekey={getActiveKey}
                    activekey={threeHoursStr}
                    onClick={handleThreeHours}
                >
                    3H
                </BtnDateUnit>
                <BtnDateUnit
                    getactivekey={getActiveKey}
                    activekey={oneDayStr}
                    onClick={handleOneDay}
                >
                    1D
                </BtnDateUnit>
            </BtnBox>
        </Col>
    );

    function defaultTimeFormat(time, value) {
        console.log("value", value, "time", time)
        return [`Amt: ${value}`, `Date: ${moment(time).format("HH:mm")}`];
    }
};