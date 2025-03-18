import React from "react";

export const Checkbox = ({onChange}) => {
    return (
        <div>
            <input type="checkbox" onChange={onChange}/>
            <label > Delivered </label>
        </div>
    )
}