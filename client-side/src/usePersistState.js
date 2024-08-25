import { useMemo, useState, useEffect } from "react";

export default function usePersistState(initial_value, id){
    // Set initial value
    const _initial_value = useMemo(() => {
        const local_storage_value_str = localStorage.getItem('state:' + id);
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return initial_value;
    }, []);

    const [state, setState] = useState(_initial_value);

    useEffect(() => {
        const state_str = JSON.stringify(state); // Stringified state
        localStorage.setItem('state:' + id, state_str) // Set stringified state as item in localStorage
    }, [state]);

    return [state, setState]
}