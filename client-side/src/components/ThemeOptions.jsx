
import { useEffect, useState } from "react";

function ThemeOption(props) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    // const [open, setOpen] = useState(false);
    const themeOptions = ["Beach", "City", "Nature", "Culture"];

    const handleSelected = (curOption) => {
        setSelectedOptions((prevOptions) => {
            if(prevOptions.includes(curOption)){
                return prevOptions.filter((item) => item !== curOption);
            } else {
                return [...prevOptions, curOption]
            }
        })

    };
    useEffect(() => {
        // This effect will run whenever selectedOptions changes
        // console.log(selectedOptions);
        props.setTheme(selectedOptions.join(","));
    }, [selectedOptions, props]);

    // const toggleDown = () => {
    //     setOpen(!open);
    // };

    return (
        <div className="relative flex flex-col">
            {/* <button
                id="dropdownDefaultButton"
                onClick={toggleDown}
                className="text-white bg-orange-500 p-3 ring-orange-500 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-white"
                type="button"
            >
                Theme
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button> */}

            {/* {open && ( */}
                <div className="bg-white">
                    <ul className="flex flex-col py-2 text-sm text-black">
                        {themeOptions.map((theme) => (
                            <li key={theme}>
                                <label className="flex items-center p-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name={theme}
                                        id={theme}
                                        onChange={() => handleSelected(theme)}
                                        className="mr-2"
                                    />
                                    {theme}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            {/* )} */}
        </div>
    );
}

export default ThemeOption;


