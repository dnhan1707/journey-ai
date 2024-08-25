import { useEffect, useState } from "react";
import "../css/ImageContainer.css"


function DisplayTitle({ response }){
    const [parsedResponse, setParsedResponse] = useState(null);

    useEffect(() => {
        try {
            const parsed = typeof response === 'string' ? JSON.parse(response) : response;
            setParsedResponse(parsed);
        } catch (error) {
            console.error('Error parsing response:', error);
        }
    }, [response]); 

    return(
        <div>
            {parsedResponse && (
                <h1 className="title font-semibold" >{parsedResponse.tripName}</h1>
            )}
        </div>
    )

}


export default DisplayTitle;
