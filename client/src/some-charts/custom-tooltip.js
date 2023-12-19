import React from "react";
import moment from "moment";

export const CustomTooltip = ({active, payload, fmtFunc = d => d}) => {
    payload = payload.map(v => v.value);
    if (active) {
        return (
            <div className="custom-tooltip">
                {fmtFunc(...payload).map((value, index) => (
                    <p className='mb-1' key={index}>{value}</p>
                ))}
            </div>
        );
    }
    return null;
};
