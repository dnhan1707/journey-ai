import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function DayCount({setNumberOfDay}){
    const [inputDay, setDay] = useState(1);
    const [alertForNumberOfDay, setAlertForNumberOfDay] = useState(false);
    useEffect(() => {
        setNumberOfDay(inputDay);
    },[inputDay, setNumberOfDay])

    const handleChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setDay(value);
            setNumberOfDay(value);
        }
    };

    const handleDecrement = () => {
        setDay((prevState) => {
            if ((prevState - 1) >= 1) {
                const newDay = parseInt(prevState) - 1;
                setNumberOfDay(newDay);
                return newDay;
            } 
            else {
                setNumberOfDay(1); // Ensure numberOfDay doesn't go below 1
                return 1;
            }
        });
    };
    const handleCloseSnackBar = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setAlertForNumberOfDay(false);
    }


    const handleIncrement = () => {
        setDay((prevState) => {
            const newDay = parseInt(prevState) + 1;
            //handle kimit here
            if(newDay > 3){
                setAlertForNumberOfDay(true);
                setNumberOfDay(3);
                return 3;
            }
            setNumberOfDay(newDay);
            return newDay;
        })    
    };

    return (
        <div className="flex items-center justify-between md:order-3 md:justify-end my-5">
            <Snackbar
                open={alertForNumberOfDay}
                autoHideDuration={5000}
                onClose={handleCloseSnackBar}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Sorry, current limit is 3 days
                </Alert>
            </Snackbar>
            <label htmlFor="counter-input" className="sr-only">
                Choose quantity:
            </label>
            <label>Number of days</label>
            <div className="flex items-center ml-4">
                <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={handleDecrement}
                >
                    <svg
                        className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                        />
                    </svg>
                </button>
                <input
                    type="number"
                    id="counter-input"
                    data-input-counter
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-black focus:outline-none focus:ring-0 dark:text-black"
                    placeholder=""
                    value={inputDay}
                    required
                    onChange={handleChange}
                />
                <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={handleIncrement}
                >
                    <svg
                        className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default DayCount;
