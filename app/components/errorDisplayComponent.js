import React from "react";
import { Button } from "reactstrap";

export const ErrorDisplayComponent = ({ handleError, country }) => {
    return (<div>
            <h5>Error while fetching Articles from <em>{`${country}...`}</em></h5>
			<Button onClick={handleError}>Back</Button>
        </div>
    )
}