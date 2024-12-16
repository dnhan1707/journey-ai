import { FaStar, FaRegStar } from "react-icons/fa";

//FaStar is fully filled star, FaRegStar is empty star

//To display the stars correctly, we need to categorize them into three types:

// Filled Stars: Fully filled stars up to the rating value.
// Half Star: If the rating has a decimal value, showing a half-filled star.
// Empty Stars: Remaining stars that are not filled.

function CommentCard({ rate, time, comment }) {
    //Total Stars: We decide the total number of stars to show, usually 5.
    const totalStar = 5;

    // Filled Star
    const filledStar = Math.floor(rate);

    //Half Star: If the rating has a decimal value, showing a half-filled star.
    // Determine if we have half star
    const halfStar = (rate % 1) !== 0;

    //Empty Star Any remaining stars after accounting for filled and half stars.
    const stars = new Array(5);
    for (let index = 0; index < totalStar; index++) {
        if(index < filledStar){
            stars[index] = 'filled';
        } else if (index === filledStar && halfStar){
            stars[index] = 'half';
        } else {
            stars[index] = 'empty';
        }
    }


    return (
        <div className="p-4 rounded-lg shadow-md w-64 bg-white group">
            <div className="flex items-center mb-2">
                {stars.map((starType, index) => (
                    starType === "filled" ? (
                        <FaStar key={index} className="text-yellow-500" />
                    ) : starType === "half" ? (
                        <FaStar key={index} className="text-yellow-500" style={{ clipPath: 'inset(0 50% 0 0)' }}/>
                    ) : (
                        <FaRegStar key={index} />
                    )
                ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">{time}</p>
            <p className="text-sm text-gray-800 group-hover:whitespace-normal truncate">{comment}</p>
        </div>
    );
}

//Parent Element (group class): The parent div has the group class. This allows its child elements to access the hover state.
// Child Elements (group-hover class): The child p element that contains the comment uses the group-hover:whitespace-normal class. This means that when the parent div (with the group class) is hovered over, the whitespace-normal class is applied to this p element.
// Initial State: The truncate class is applied to the p element by default, ensuring that the text is truncated.
// Hover State: When the parent div is hovered over, the whitespace-normal class overrides the truncate behavior, allowing the text to wrap normally.
//Use whitespace-normal to cause text to wrap normally within an element. Newlines and spaces will be collapsed.

export default CommentCard;
