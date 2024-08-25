import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

function GeminiResponse(props) {
    const [data, setData] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGeminiData = async () => {
            try {
                setLoading(true);

                const response = await fetch("/api/gemini/gemini_response", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ prompt: props.command })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // console.log("GEMINIResponse: ", data.message);
                props.onDataReceived(data.message);
                setData(data.message);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (props.command) {
            fetchGeminiData();
        }
    }, [props.command]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="GeminiResponse">
            {isLoading ? <LoadingPage /> : <p>{data}</p>}
        </div>
    );
}

export default GeminiResponse;
