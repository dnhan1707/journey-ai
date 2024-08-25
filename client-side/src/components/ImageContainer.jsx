import "../css/ImageContainer.css"
import FetchImage from "./FetchImage.jsx";
import DisplayTitle from "./DisplayTitle.jsx";
import BackBtn from "./BackBtn.jsx";

function ImageContainer(props){
    
    return (
        <div className="image_container relative">
            <BackBtn/>
            <FetchImage query={props.location}/>
            <DisplayTitle response={props.response}/>
        </div>   
    )
}

export default ImageContainer;