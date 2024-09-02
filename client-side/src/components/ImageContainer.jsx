import "../css/ImageContainer.css"
import FetchImage from "./FetchImage.js";
import DisplayTitle from "./DisplayTitle.jsx";
import BackBtn from "./BackBtn.jsx";

function ImageContainer({ location, response, isImageFetched }){
    
    return (
        <div className="image_container relative">
            <BackBtn/>
            <FetchImage query={location} isImagedFetchedSuccessfully={isImageFetched}/>
            <DisplayTitle response={response}/>
        </div>   
    )
}

export default ImageContainer;