import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import CustomizeOptions from './CustomizeOptions';
library.add(fas, far, fab)


function CustomizePlan() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prevState) => {
            return !prevState;
        })
    }

    return (
        <div className="absolute pt-6 pl-10">
            <button className="flex items-center p-2 bg-black dark:text-white rounded-lg" onClick={handleOpen}>
                <FontAwesomeIcon icon="fa-solid fa-bars" />
            </button>
            
            {/* {
                open && (
                    <CustomizeOptions show={open} onClose={handleOpen}/>
                )
            } */}

        </div>
    );
}

export default CustomizePlan;
