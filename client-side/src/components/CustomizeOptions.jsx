import ThemeOption from "./ThemeOptions";
import BudgetSlider from "./BudgetSlider";
function UserPrompt({ show, onClose, setTheme, setSpecialRequest, setBudget}) {

    const handleChange = (event) => {
        setSpecialRequest(event.target.value);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg w-full max-w-xl h-2/3 overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col h-full">
                    <div className="text-xl font-bold mb-2">
                        What theme do you like?
                    </div>

                    <div>
                        <ThemeOption setTheme={setTheme}></ThemeOption>
                    </div>

                    <div className="text-xl font-bold mb-2">
                        Budget level
                    </div>

                    <div> 
                        <BudgetSlider setBudget={setBudget}></BudgetSlider>
                    </div>

                    <div className="text-xl font-bold mb-2">
                        Tell us more about your style!
                    </div>

                    <div className="flex-grow">
                        <textarea
                            className="w-full h-4/5 p-2 border border-gray-300 rounded-lg"
                            onChange={handleChange}
                            placeholder="Any special thing you want for your travel plan?"
                        ></textarea>
                    </div>

                    <button className="flex justify-center items-center bg-orange-500 rounded-lg text-white px-4 py-2" onClick={onClose}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPrompt;
