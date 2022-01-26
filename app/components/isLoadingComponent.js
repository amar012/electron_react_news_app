import React from "react";

export const IsLoadingComponent = ({ country }) =>{
    return (
        <h5>Fetching Articles from <em>{`${country}...`}</em></h5>
    )
}