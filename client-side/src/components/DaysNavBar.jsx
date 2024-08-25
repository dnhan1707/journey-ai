function DaysNavBar() {
    return (
        <div className="w-full flex justify-center fixed top-0 z-50">
            <nav className="bg-white bg-opacity-50 rounded-lg shadow-lg flex justify-center py-2">
                <div className="flex flex-row space-x-4">
                    <div className="bg-black p-2 rounded-lg text-white">
                        <a href="#">Day 1</a>
                    </div>
                    <div className="bg-black p-2 rounded-lg text-white">
                        <a href="#">Day 2</a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default DaysNavBar;
