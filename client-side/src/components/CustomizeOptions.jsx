import ThemeOption from "./ThemeOptions";
import BudgetSlider from "./BudgetSlider";
function UserPrompt({ show, onClose, setTheme, setBudget}) {

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg w-full max-w-xl overflow-y-auto relative"
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

                    <button className="flex justify-center items-center bg-orange-500 rounded-lg text-white px-4 py-2" onClick={onClose}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPrompt;
