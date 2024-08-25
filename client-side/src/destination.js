import React from 'react';
import { useLocation } from 'react-router-dom';

function Destination() {
    
    const location = useLocation().state.location;
    console.log(location," here.");

    return(
    <div>
        <h2>Destination Page</h2>
        
        <GenerateMap  location={location}/>
    </div>
    );
}

export default Destination;