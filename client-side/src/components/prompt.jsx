// prompt.jsx
function journeyCmd(location, numOfPeople, day, theme, specialRequest, budget){ 

    let addTheme = "";
    let addBudget = "";
    let addSpecial = "";
    let addCustomize = "";

    if(theme){
        addTheme = `in the ${theme} theme`;
    }
    if(budget){
        addBudget = `and with the ${budget} budget`; 
    }
    if(specialRequest){
        addSpecial = `. Also I want special thing is that ${specialRequest}`;
    }

    addCustomize = addTheme + addBudget + addSpecial;

    return `List a traveling plan with at ${location} city. For a group of ${numOfPeople} people in ${day} days ${addCustomize}. Please
    estimate the price for each activities based on number of people also (in US dollar and must use this JSON format look like this
example (Please keep the same key name, do not change them), 
:
{
    "tripName": "Pasadena Trip", 
    "travelers": ${numOfPeople}, 
    "duration": ${day}, 
    "theme": "${theme}",
    "estimated_total" : "500",
    "itinerary": 
    [
        {
            "day": 1, 
            "activities": 
            [
                {
                    "name": "Visit the Huntington Library, Art Museum, and Botanical Gardens", 
                    "location_name": "Huntington Library, San Marino, CA",
                    "type": "palette", 
                    "duration": "9am - 12pm", 
                    "price_level": "30 - 35",
                    "description": "Explore beautiful gardens, art exhibits, and historical manuscripts."
                }, 

                {
                    "name": "Dinner at The Royce at The Langham", 
                    "location_name: "The Royce Wood Fired Steakhouse, Pasadena, CA",
                    "type": "utensils", 
                    "duration": "12:30pm - 2pm",
                    "price_level": "40 - 50", 
                    "description": "Enjoy fine dining with stunning views at this elegant restaurant."
                }
            ],
        }, 
    ],
}
    
Note: Each activity's type should match one of the following values. The corresponding value will be used as the icon identifier:

- **Food & Drink**: "utensils", "coffee", "cocktail", "beer"
- **Museum**: "landmark"
- **Entertainment**: "film", "music", "theater-masks", "landmark", "paw", "ferris-wheel", "dice"
- **Outdoor Activities**: "hiking", "campground", "fish", "bicycle", "umbrella-beach", "tree"
- **Sports & Fitness**: "dumbbell", "spa", "running", "swimmer", "table-tennis", "futbol", "basketball-ball"
- **Shopping**: "shopping-bag", "shopping-cart", "store", "store-alt"
- **Travel**: "plane", "train", "car", "ship"
- **Education**: "chalkboard-teacher", "tools", "user-graduate", "users"
- **Wellness**: "hands", "om"
- **Social**: "glass-cheers", "handshake", "network-wired"
- **Work**: "briefcase", "laptop", "chart-line"`;
};

export default journeyCmd;
