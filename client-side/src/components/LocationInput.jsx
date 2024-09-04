
function LocationInput({ setLocation }) {
    const handleChange = (event) => {

        setLocation(event.target.value);
    };

    return (
        <div>
            <form className="w-full">
                <label htmlFor="search"
                       className="mb-0.5 text-sm font-medium text-black sr-only dark:text-white">Your destination</label>

                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                           <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                     stroke-width="2"
                                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                           </svg>
                        </div>
                    </div>
                    <input
                        type="search"
                        id="search"
                        onChange={ handleChange }
                        // className="block w-3/5 p-3 ps-12 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        className="block w-full p-3 ps-12 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your destination"
                        required
                    />
                </div>

            </form>
        </div>
    );
}



export default LocationInput;
